interface HeaderProps {
  isLoggedIn?: boolean
  onLogout?: () => void
  onHeadlineClick?: () => void
}

export default function Header({ isLoggedIn = false, onLogout }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-6">
      <div className="container mx-auto px-4 flex justify-between items-start">
        <div>
          <h1
            className="text-3xl font-bold text-green-500 cursor-pointer hover:underline"
            onClick={typeof arguments[0]?.onHeadlineClick === 'function' ? arguments[0].onHeadlineClick : undefined}
          >
            Your Personalized Festival Clashfinder
          </h1>
          <p className="text-gray-400 mt-2">
            Create a custom Clashfinder link using your Spotify likes or a playlist.
          </p>
        </div>
        {isLoggedIn && arguments[0]?.onLogout && (
          <button
            onClick={arguments[0].onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
