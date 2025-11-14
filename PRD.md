
## 📄 Product Requirements Document (PRD)

### 1. **Project Title**
**Festival Clashfinder Enhancer**

### 2. **Purpose**
To create a simple, user-friendly web interface that allows festival-goers to log in with Spotify, select a festival, and receive a personalized Clashfinder link with highlighted shows based on their favorite artists.

### 3. **Target Users**
- Music festival attendees
- Spotify users
- Fans of Clashfinder

### 4. **Core Features**
| Feature | Description |
|--------|-------------|
| **Spotify Login** | User initiates login flow to authorize access to their liked songs |
| **Festival Selection** | User inputs/selects a festival edition (e.g., `tml2025w1`) |
| **Personalized Clashfinder Link** | App fetches user's liked artists, intersects with festival lineup, and returns a Clashfinder link with highlights |
| **Link Display & Copy** | Display the generated link and allow users to copy or open it |

### 5. **User Flow**
1. User lands on homepage
2. Clicks “Login with Spotify” → redirected to Spotify login
3. After login, redirected back with token stored in cookies
4. User enters/selects festival name
5. App calls backend `/spotify/festival/{festival}` endpoint
6. Backend returns Clashfinder link
7. Link is displayed with option to open or copy

---

## 🧪 Technical Design

### 1. **Tech Stack**
| Layer | Technology |
|------|------------|
| Frontend Framework | React (with Vite) |
| Language | TypeScript |
| Styling | CSS Modules or Tailwind CSS |
| Hosting | Render (Static Site) |
| API Communication | `fetch` or `axios` |
| State Management | React `useState` / `useEffect` (no Redux needed) |

---

### 2. **Component Structure**
| Component | Purpose |
|-----------|---------|
| `App.tsx` | Root component, handles routing |
| `Login.tsx` | Button to initiate Spotify login |
| `FestivalForm.tsx` | Input field for festival name |
| `Result.tsx` | Displays generated Clashfinder link |
| `Header.tsx` | Branding and navigation |
| `Footer.tsx` | Credits and links |

---

### 3. **API Integration**
```ts
// Login.tsx
const handleLogin = async () => {
  const res = await fetch('/Login/Login');
  const { loginUrl } = await res.json();
  window.location.href = loginUrl;
};

// FestivalForm.tsx
const fetchFestivalLink = async (festival: string) => {
  const res = await fetch(`/spotify/festival/${festival}`, {
    credentials: 'include',
  });
  const { clashfinderUrl } = await res.json();
  setLink(clashfinderUrl);
};
```

---

### 4. **Routing**
Use React Router (optional for SPA):
- `/` → Home/Login
- `/festival` → Festival input and result

---

### 5. **Environment Variables**
In `.env`:
```
VITE_API_BASE_URL=https://your-backend-url.com
```

---

### 6. **Deployment on Render**
- Push frontend to GitHub
- Create Static Site on Render
- Set:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Environment variable: `VITE_API_BASE_URL`

---

### 7. **Security & UX Considerations**
- Handle CORS in backend
- Show loading spinners during API calls
- Display error messages for failed requests
- Validate festival name input

---

Would you like me to generate the actual React component code for this structure next? I can scaffold the project and give you copy-paste-ready files.
