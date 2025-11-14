# Festival Clashfinder Enhancer - Frontend

A React + TypeScript frontend application that connects Spotify users with festival lineups, showing personalized Clashfinder links based on favorite artists.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file for local development:
   ```
   VITE_API_BASE_URL=http://localhost:44331
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 📁 Project Structure

```
src/
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
├── index.css              # Global styles
└── components/
    ├── Header.tsx         # App header with logout
    ├── Footer.tsx         # App footer
    ├── Login.tsx          # Spotify login button
    ├── FestivalForm.tsx   # Festival selection form
    ├── Result.tsx         # Clashfinder link display
    └── ErrorBoundary.tsx  # Error handling
```

## 🔧 Configuration

### Environment Variables

- **Development**: Uses `.env` (defaults to localhost:44331)
- **Production**: Uses `.env.production` (points to https://festivallineupbyspotify.onrender.com)

### Render Deployment

1. Connect your GitHub repository to Render
2. Create a Static Site
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variable: `VITE_API_BASE_URL=https://festivallineupbyspotify.onrender.com`

## ✨ Features

- ✅ Spotify OAuth login
- ✅ Festival selection with personalized results
- ✅ Display of liked track count for each festival
- ✅ Copy Clashfinder link to clipboard
- ✅ Open Clashfinder in new tab
- ✅ User logout functionality
- ✅ Responsive design with Tailwind CSS
- ✅ Production-ready error handling

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Fetch API
- **State Management**: React Hooks

## 📝 Notes

- The app uses cookies for authentication (must have credentials: 'include' in fetch calls)
- CORS must be enabled on the backend for cross-origin requests
- The API backend URL is configurable via environment variables for easy deployment

## 🚢 Deployment Checklist

- [ ] Backend API deployed and running
- [ ] CORS enabled on backend
- [ ] `.env.production` configured with backend URL
- [ ] All debug console.log statements removed
- [ ] Build tested locally: `npm run build && npm run preview`
- [ ] Git repository pushed to GitHub
- [ ] Render Static Site created and connected
- [ ] Environment variables set in Render dashboard
- [ ] SSL certificate configured (automatic on Render)
