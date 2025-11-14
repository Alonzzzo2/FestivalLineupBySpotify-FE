interface HeaderProps {
  isLoggedIn?: boolean
  onLogout?: () => void
}

export default function Header({ isLoggedIn = false, onLogout }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-6">
      <div className="container mx-auto px-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">
            🎵 Festival Clashfinder Enhancer
          </h1>
          <p className="text-gray-400 mt-2">
            Find your favorite artists at any festival
          </p>
        </div>
        {isLoggedIn && onLogout && (
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
