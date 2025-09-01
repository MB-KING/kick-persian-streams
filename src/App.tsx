import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import StreamerList from './components/StreamerList'
import Loading from './components/Loading'
import ApiInfo from './components/ApiInfo'
import type { Streamer } from './types/Streamer'
import { kickApiService } from './services/kickApi'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0, failed: 0, retrying: 0 })

  useEffect(() => {
    loadStreamers()
  }, [])

  const loadStreamers = async () => {
    try {
      setLoading(true)
      setError(null)
      setApiStatus('loading')
      setStreamers([])
      
      // Get streamer IDs
      const streamerIds = ['Seenacrash', 'Keoxer', 'Farshadsilent', 'LastDudeStanding', 'Kamandd', 'AmirRight', 'DeejayFaren', 'AliBesi', 'Nichoqu', 'Siabach', 'AliDP', 'Erph', 'Eyzed', 'Heisenbergofficial', 'Nabbiltv', 'Mckellen', 'SamiraSaly', 'Fox_3pi']
      const limit = 20
      const limitedIds = streamerIds.slice(0, limit)
      
      setLoadingProgress({ current: 0, total: limitedIds.length, failed: 0, retrying: 0 })
      
      const validStreamers: Streamer[] = []
      const failedUsernames: string[] = []
      
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
          setLoadingProgress(prev => ({ ...prev, failed: prev.failed + 1 }))
          return { username, success: false, error }
        }
      })
      
      // Wait for all first pass requests to complete
      await Promise.allSettled(loadPromises)
      
      // Second pass: Retry failed usernames
      if (failedUsernames.length > 0) {
        console.log(`Second pass: Retrying ${failedUsernames.length} failed usernames...`)
        setLoadingProgress(prev => ({ ...prev, retrying: failedUsernames.length }))
        
        for (let i = 0; i < failedUsernames.length; i++) {
          const username = failedUsernames[i]
          try {
            console.log(`Retrying ${username} (${i + 1}/${failedUsernames.length})`)
            const streamer = await kickApiService.getStreamerInfo(username)
            if (streamer) {
              validStreamers.push(streamer)
              setStreamers([...validStreamers])
              setLoadingProgress(prev => ({ ...prev, current: prev.current + 1, retrying: prev.retrying - 1 }))
            }
          } catch (error) {
            console.error(`Retry failed for ${username}:`, error)
            setLoadingProgress(prev => ({ ...prev, retrying: prev.retrying - 1 }))
          }
          
          // Small delay between retry requests
          if (i < failedUsernames.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200))
          }
        }
      }
      
      setLastUpdated(new Date())
      setApiStatus('success')
      setLoadingProgress({ current: 0, total: 0, failed: 0, retrying: 0 })
      
      console.log(`Successfully loaded ${validStreamers.length} streamers out of ${limitedIds.length}`)
      
    } catch (err) {
      setError('خطا در بارگذاری استریمرها')
      setApiStatus('error')
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
            <ApiInfo 
              totalStreamers={totalStreamers}
              liveStreamers={liveStreamers}
              lastUpdated={lastUpdated}
              apiStatus={apiStatus}
            />
            <StreamerList 
              streamers={streamers}
              filter={searchQuery}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default App
