import { useState } from 'react'

interface FestivalFormProps {
  setClashfinderLink: (link: string) => void
  setFestivalStats?: (stats: { totalPossibleLikedTracks: number; rank: number }) => void
}

export default function FestivalForm({ setClashfinderLink, setFestivalStats }: FestivalFormProps) {
  const [festival, setFestival] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!festival.trim()) {
      setError('Please enter a festival name')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/spotify/festival/${encodeURIComponent(
          festival
        )}`,
        {
          credentials: 'include',
        }
      )

      if (!res.ok) {
        throw new Error('Failed to fetch festival data')
      }

      const contentType = res.headers.get('content-type')
      let clashfinderUrl: string | null = null

      // Handle both JSON and plain text responses
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json()
        clashfinderUrl = data.url || data.clashfinderUrl
        
        // Extract stats if available
        if (setFestivalStats && data.totalPossibleLikedTracks !== undefined) {
          setFestivalStats({
            totalPossibleLikedTracks: data.totalPossibleLikedTracks,
            rank: data.rank || 0,
          })
        }
      } else {
        // If response is plain text, treat it as the URL directly
        clashfinderUrl = await res.text()
      }

      if (clashfinderUrl && clashfinderUrl.startsWith('http')) {
        setClashfinderLink(clashfinderUrl)
      } else {
        setError('No valid Clashfinder URL returned')
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Error fetching festival data. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Select Your Festival</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="festival" className="block text-gray-300 mb-2">
            Festival Name (e.g., tml2025w1)
          </label>
          <input
            id="festival"
            type="text"
            value={festival}
            onChange={(e) => setFestival(e.target.value)}
            placeholder="Enter festival ID..."
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-green-500"
            disabled={loading}
          />
          <p className="text-gray-400 text-sm mt-1">
            Check Clashfinder for available festivals
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900 text-red-200 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 px-4 rounded transition duration-200"
        >
          {loading ? 'Loading...' : '🎪 Get My Clashfinder'}
        </button>
      </form>
    </div>
  )
}
