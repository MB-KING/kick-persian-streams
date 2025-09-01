export interface Streamer {
  id: number;
  username: string;
  displayName?: string;
  avatar?: string;
  followers?: number;
  isLive?: boolean;
  game?: string;
  title?: string;
  viewers?: number;
  category?: string;
  language?: string;
  tags?: string[];
}

export interface StreamerCardProps {
  streamer: Streamer;
}

export interface StreamerListProps {
  streamers: Streamer[];
  filter?: string;
  isLoading?: boolean;
}
