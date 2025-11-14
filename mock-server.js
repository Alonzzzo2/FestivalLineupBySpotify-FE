import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 44331

app.use(cors())
app.use(express.json())

// Mock login endpoint
app.get('/Login/Login', (req, res) => {
  // In production, this would redirect to Spotify OAuth
  // For testing, we'll just return a fake URL
  res.json({
    loginUrl: `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:5173/callback`,
  })
})

// Mock festival endpoint
app.get('/spotify/festival/:festival', (req, res) => {
  const { festival } = req.params
  res.json({
    clashfinderUrl: `https://clashfinder.com/${festival}?artists=artist1,artist2,artist3`,
  })
})

// Mock profile check
app.get('/spotify/profile', (req, res) => {
  res.json({ user: 'testuser' })
})

app.listen(PORT, () => {
  console.log(`🎵 Mock backend running on http://localhost:${PORT}`)
})
