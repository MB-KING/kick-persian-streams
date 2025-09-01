import type { Streamer } from '../types/Streamer';
import persianStreamerIds from '../data/persian-streamers.json';

// Official Kick.com Public API endpoints based on docs.kick.com
const KICK_API_BASE = 'https://kick.com/api/v1';

// Official API endpoints from Kick.com documentation
const KICK_ENDPOINTS = {
  // Get channel info by slug (username)
  channel: (username: string) => `${KICK_API_BASE}/channels/${username}`,
  // Get channels by slug (search)
  channels: `${KICK_API_BASE}/channels`,
};

// Narrow interface based on actual response used
export interface KickChannel {
  id: number;
  slug: string;
  followersCount?: number;
  playback_url?: string;
  livestream?: unknown | null;
  recent_categories?: Array<{
    name?: string;
    slug?: string;
    category?: { name?: string; slug?: string };
  }>;
  user?: {
    id?: number;
    username?: string;
    profile_pic?: string;
  };
}

class KickApiService {
  private async makeRequest(url: string, options: RequestInit = {}): Promise<Record<string, unknown>> {
    const defaultHeaders = {
      'Accept': 'application/json',
      'User-Agent': 'Kick-Persian-Streams/1.0',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        // Remove CORS mode to use default browser behavior
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Kick API request failed:', error);
      throw error;
    }
  }

  async getPersianStreamers(limit: number = 20): Promise<Streamer[]> {
    try {
      console.log('Fetching Persian streamers using official Kick.com API...');
      
      // Get streamer IDs from local JSON file
      const streamerIds = persianStreamerIds.slice(0, limit);
      console.log(`Found ${streamerIds.length} streamer IDs:`, streamerIds);
      
      // Fetch real-time data for each streamer ID with delay to avoid rate limiting
      const validStreamers: Streamer[] = [];
      
      for (let i = 0; i < streamerIds.length; i++) {
        const username = streamerIds[i];
        try {
          console.log(`Fetching ${i + 1}/${streamerIds.length}: ${username}`);
          const streamer = await this.getStreamerInfo(username);
          if (streamer) {
            validStreamers.push(streamer);
          }
        } catch (error) {
          console.error(`Failed to fetch ${username}:`, error);
        }
        
        // Add delay between requests to avoid rate limiting (except for last request)
        if (i < streamerIds.length - 1) {
          await this.delay(500); // 500ms delay between requests
        }
      }
      
      console.log(`Successfully fetched ${validStreamers.length} streamers with real data`);
      return validStreamers;
      
    } catch (error) {
      console.error('Failed to fetch Persian streamers:', error);
      // Return empty array instead of fallback data
      return [];
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getStreamerInfo(username: string): Promise<Streamer | null> {
    try {
      console.log(`Fetching info for ${username} using official API...`);
      
      // Only use channel endpoint (livestream requires auth and returns 401)
      const channelResponse = await this.makeRequest(KICK_ENDPOINTS.channel(username));

      // Some Kick endpoints return the object directly (not under data)
      const maybeChannel = channelResponse as Partial<KickChannel> | null | undefined;
      if (maybeChannel && (typeof maybeChannel.id === 'number' || typeof (maybeChannel as any).user === 'object')) {
        const channel = maybeChannel as KickChannel;
        console.log(`Channel API success for ${username}`);
        return this.transformChannelData(channel, username);
      }

      console.log(`Channel API returned no data for ${username}`);
      return null;
      
    } catch (error) {
      console.error(`Failed to fetch info for ${username}:`, error);
      return null;
    }
  }

  private transformChannelData(channel: KickChannel, username: string): Streamer {
    const user = channel.user;
    const recent = Array.isArray(channel.recent_categories) && channel.recent_categories.length > 0
      ? channel.recent_categories[0]
      : undefined;

    const streamer: Partial<Streamer> = {
      id: channel.id,
      username: (user?.username as string) || username,
    };

    if (user?.username) {
      streamer.displayName = user.username;
    }

    if (typeof user?.profile_pic === 'string' && user.profile_pic.length > 0) {
      streamer.avatar = user.profile_pic;
    }

    if (typeof channel.followersCount === 'number') {
      streamer.followers = channel.followersCount;
    }

    // isLive based on presence of livestream object
    if (channel.hasOwnProperty('livestream')) {
      streamer.isLive = channel.livestream ? true : false;
    }

    // Category/game from recent categories if present
    if (recent?.name) {
      streamer.category = recent.name;
      streamer.game = recent.name;
    } else if (recent?.category?.name) {
      streamer.category = recent.category.name;
      streamer.game = recent.category.name;
    }

    return streamer as Streamer;
  }

  async searchStreamers(query: string): Promise<Streamer[]> {
    try {
      // Search through stored streamer IDs first
      const matchingIds = persianStreamerIds.filter(id => 
        id.toLowerCase().includes(query.toLowerCase())
      );

      if (matchingIds.length === 0) {
        return [];
      }

      // Fetch real-time data for matching streamers with delay
      const validStreamers: Streamer[] = [];
      
      for (let i = 0; i < matchingIds.length; i++) {
        const username = matchingIds[i];
        try {
          const streamer = await this.getStreamerInfo(username);
          if (streamer) {
            validStreamers.push(streamer);
          }
        } catch (error) {
          console.error(`Failed to fetch ${username}:`, error);
        }
        
        // Add delay between requests to avoid rate limiting (except for last request)
        if (i < matchingIds.length - 1) {
          await this.delay(500);
        }
      }

      return validStreamers;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }
}

export const kickApiService = new KickApiService();
