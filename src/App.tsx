import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import FestivalForm from './components/FestivalForm'
import Result from './components/Result'
import { ErrorBoundary } from './components/ErrorBoundary';
import { FestivalMatchResponse } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [clashfinderLink, setClashfinderLink] = useState<string | null>(null)
  const [festivalStats, setFestivalStats] = useState<FestivalMatchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [entryMode, setEntryMode] = useState<'choose' | 'login' | 'playlist'>('choose');

  const [festivals, setFestivals] = useState<Array<{
    title: string;
    internalName: string;
    startDate: string;
    printAdvisory: number;
  }>>([])
  const [festivalsError, setFestivalsError] = useState<string | null>(null)

  const checkLoginStatus = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/authentication/profile`

      const res = await fetch(apiUrl, {
        credentials: 'include',
      })

      if (res.ok) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } catch (error) {
      setIsLoggedIn(false)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchFestivals = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/clashfinders/list/all`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setFestivals(data);
        } else {
          setFestivals([]);
          setFestivalsError('Festival list response is invalid.');
        }
      } else {
        setFestivalsError('Failed to load festival list. Please try again later.');
      }
    } catch (err) {
      setFestivalsError('Network error loading festival list.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/authentication/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      // Silently fail - user will be logged out client-side anyway
    } finally {
      setIsLoggedIn(false)
      setClashfinderLink(null)
      setEntryMode('choose');
    }
  }

  // Check if user is already logged in (token in cookie)
  useEffect(() => {
    checkLoginStatus()
    fetchFestivals()
  }, [])

  // Recheck login status when window comes back into focus
  useEffect(() => {
    const handleFocus = () => {
      checkLoginStatus()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} onHeadlineClick={() => setEntryMode('choose')} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {entryMode === 'choose' ? (
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-6 text-white">Welcome!</h2>
                <p className="text-gray-300 mb-6">Choose how you want to generate your festival link:</p>
                <div className="flex flex-col gap-4">
                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-200"
                    onClick={() => setEntryMode('login')}
                  >
                    {isLoggedIn ? '🎵 Use Your Liked Songs' : '🎵 Login with Spotify (Liked Songs)'}
                  </button>
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition duration-200"
                    onClick={() => setEntryMode('playlist')}
                  >
                    📋 Use a Public Spotify Playlist
                  </button>
                </div>
              </div>
            ) : entryMode === 'login' ? (
              !isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
              ) : clashfinderLink ? (
                <Result
                  festival={festivalStats}
                  onReset={() => {
                    setClashfinderLink(null)
                    setFestivalStats(null)
                  }}
                />
              ) : (
                <FestivalForm
                  setClashfinderLink={setClashfinderLink}
                  setFestivalStats={setFestivalStats}
                  mode={'liked'}
                  festivals={festivals}
                  festivalsError={festivalsError}
                />
              )
            ) : entryMode === 'playlist' ? (
              clashfinderLink ? (
                <Result
                  festival={festivalStats}
                  onReset={() => {
                    setClashfinderLink(null)
                    setFestivalStats(null)
                  }}
                />
              ) : (
                <FestivalForm
                  setClashfinderLink={setClashfinderLink}
                  setFestivalStats={setFestivalStats}
                  mode={'playlist'}
                  festivals={festivals}
                  festivalsError={festivalsError}
                />
              )
            ) : null}
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
