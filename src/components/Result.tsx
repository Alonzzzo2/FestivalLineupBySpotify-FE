import { useState } from 'react'

interface ResultProps {
  link: string
  stats?: {
    totalPossibleLikedTracks: number
    rank: number
    festivalName?: string
  }
  onReset: () => void
}

export default function Result({ link, stats, onReset }: ResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleOpen = () => {
    window.open(link, '_blank')
  }

  const displayFestivalName = stats?.festivalName;
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-white">🎉 Your Personalized Link</h2>

      {displayFestivalName && (
        <div className="mb-6 p-3 bg-gray-900 rounded-lg border border-gray-700 text-center">
          <span className="text-white text-lg font-bold">Festival: </span>
          <span className="text-green-300 text-lg font-semibold">{displayFestivalName}</span>
        </div>
      )}
      {stats && (
        <div className="mb-6 p-4 bg-green-900 rounded-lg border border-green-700">
          <div className="text-center">
            <p className="text-green-300 text-sm mb-2">Possible Liked Tracks You Can Hear</p>
            <p className="text-4xl font-bold text-green-400">{stats.totalPossibleLikedTracks}</p>
            <p className="text-green-300 text-xs mt-2">Based on artists you're watching & your Spotify favorites</p>
            <p className="text-green-300 text-sm mt-2">Rank: <span className="font-bold">{stats.rank}</span></p>
          </div>
        </div>
      )}

      <div className="bg-gray-700 p-4 rounded mb-6 break-all">
        <p className="text-green-400 font-mono text-sm">{link}</p>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleCopy}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          {copied ? '✓ Copied!' : '📋 Copy Link'}
        </button>
        <button
          onClick={handleOpen}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          🔗 Open in Clashfinder
        </button>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        ← Try Another Festival
      </button>
    </div>
  )
}
