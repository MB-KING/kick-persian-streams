import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import StreamerList from './components/StreamerList'
import Loading from './components/Loading'

import StreamerRequest from './components/StreamerRequest'
import type { Streamer } from './types/Streamer'
import { kickApiService } from './services/kickApi'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0, failed: 0, retrying: 0 })
  const [showStreamerRequest, setShowStreamerRequest] = useState(false)

  useEffect(() => {
    loadStreamers()
  }, [])

  const loadStreamers = async () => {
    try {
      setLoading(true)
      setError(null)
      setStreamers([])
      
      // Get streamer IDs
      const streamerIds = ['Seenacrash', 'Keoxer', 'Farshadsilent', 'LastDudeStanding', 'Kamandd', 'AmirRight', 'DeejayFaren', 'AliBesi', 'Nichoqu', 'Siabach', 'AliDP', 'Erph', 'Eyzed', 'Heisenbergofficial', 'Nabbiltv', 'Mckellen', 'SamiraSaly', 'Fox_3pi']
      const limit = 20
      const limitedIds = streamerIds.slice(0, limit)
      
      setLoadingProgress({ current: 0, total: limitedIds.length, failed: 0, retrying: 0 })
      
      const validStreamers: Streamer[] = []
      const failedUsernames: string[] = []
      const retryAttempts = new Map<string, number>()
      
      // First pass: Try to load all streamers simultaneously
      console.log('Starting first pass: Loading all streamers simultaneously...')
      
      const loadPromises = limitedIds.map(async (username, index) => {
        try {
          console.log(`Fetching ${username} (${index + 1}/${limitedIds.length})`)
          const streamer = await kickApiService.getStreamerInfo(username)
          if (streamer) {
            validStreamers.push(streamer)
            // Update streamers state immediately to show progress
            setStreamers([...validStreamers])
            setLoadingProgress(prev => ({ ...prev, current: prev.current + 1 }))
          }
          return { username, success: true, streamer }
        } catch (error) {
          console.error(`Failed to fetch ${username}:`, error)
          failedUsernames.push(username)
          retryAttempts.set(username, 1)
          setLoadingProgress(prev => ({ ...prev, failed: prev.failed + 1 }))
          return { username, success: false, error }
        }
      })
      
      // Wait for all first pass requests to complete
      await Promise.allSettled(loadPromises)
      
      // Retry failed usernames up to 3 times
      let currentRetryRound = 1
      const maxRetries = 3
      
      while (failedUsernames.length > 0 && currentRetryRound <= maxRetries) {
        console.log(`Retry round ${currentRetryRound}: Retrying ${failedUsernames.length} failed usernames...`)
        setLoadingProgress(prev => ({ ...prev, retrying: failedUsernames.length }))
        
        const stillFailed: string[] = []
        
        for (let i = 0; i < failedUsernames.length; i++) {
          const username = failedUsernames[i]
          const currentAttempts = retryAttempts.get(username) || 1
          
          try {
            console.log(`Retrying ${username} (attempt ${currentAttempts + 1}/${maxRetries + 1})`)
            const streamer = await kickApiService.getStreamerInfo(username)
            if (streamer) {
              validStreamers.push(streamer)
              setStreamers([...validStreamers])
              setLoadingProgress(prev => ({ ...prev, current: prev.current + 1, retrying: prev.retrying - 1 }))
              console.log(`✅ Successfully loaded ${username} after ${currentAttempts + 1} attempts`)
            } else {
              throw new Error('No streamer data returned')
            }
          } catch (error) {
            console.error(`Retry attempt ${currentAttempts + 1} failed for ${username}:`, error)
            retryAttempts.set(username, currentAttempts + 1)
            
            if (currentAttempts + 1 <= maxRetries) {
              stillFailed.push(username)
            } else {
              console.log(`❌ Giving up on ${username} after ${maxRetries + 1} attempts`)
              setLoadingProgress(prev => ({ ...prev, retrying: prev.retrying - 1 }))
            }
          }
          
          // Small delay between retry requests
          if (i < failedUsernames.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200))
          }
        }
        
        failedUsernames.length = 0
        failedUsernames.push(...stillFailed)
        currentRetryRound++
      }
      
      // Log final results
      const totalAttempted = limitedIds.length
      const totalLoaded = validStreamers.length
      const totalFailed = limitedIds.length - totalLoaded
      
      console.log(`📊 Final Results:`)
      console.log(`   Total attempted: ${totalAttempted}`)
      console.log(`   Successfully loaded: ${totalLoaded}`)
      console.log(`   Failed after all retries: ${totalFailed}`)
      
      if (totalFailed > 0) {
        const failedList = limitedIds.filter(id => !validStreamers.some(s => s.username === id))
        console.log(`   Failed usernames: ${failedList.join(', ')}`)
      }
      
      setLoadingProgress({ current: 0, total: 0, failed: 0, retrying: 0 })
      
    } catch (err) {
      setError('خطا در بارگذاری استریمرها')
      console.error('Failed to load streamers:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    
    if (query.trim()) {
      try {
        setLoading(true)
        const searchResults = await kickApiService.searchStreamers(query)
        setStreamers(searchResults)
      } catch (err) {
        console.error('Search failed:', err)
        // Fallback to local filtering
        const filtered = streamers.filter(streamer => 
          (streamer.displayName?.toLowerCase().includes(query.toLowerCase())) ||
          (streamer.game?.toLowerCase().includes(query.toLowerCase())) ||
          (streamer.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
        )
        setStreamers(filtered)
      } finally {
        setLoading(false)
      }
    } else {
      // If search is empty, reload all streamers
      loadStreamers()
    }
  }

  const totalStreamers = streamers.length
  const liveStreamers = streamers.filter(s => s.isLive === true).length

  return (
    <div className="app">
      <Header 
        onSearch={handleSearch}
        totalStreamers={totalStreamers}
        liveStreamers={liveStreamers}
        onRequestStreamer={() => setShowStreamerRequest(true)}
      />
      <main className="main-content">
        {loading ? (
          <Loading progress={loadingProgress} />
        ) : error ? (
          <div className="error-container">
            <h3>خطا در بارگذاری</h3>
            <p>{error}</p>
            <button onClick={loadStreamers} className="retry-button">
              تلاش مجدد
            </button>
          </div>
        ) : (
          <>

            <StreamerRequest 
              isOpen={showStreamerRequest}
              onClose={() => setShowStreamerRequest(false)}
            />
            <StreamerList 
              streamers={streamers}
              filter={searchQuery}
              isLoading={loading}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default App
