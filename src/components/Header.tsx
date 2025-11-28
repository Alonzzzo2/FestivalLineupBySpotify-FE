interface HeaderProps {
  isLoggedIn?: boolean
  onLogout?: () => void
  onHeadlineClick?: () => void
}

export default function Header(props: HeaderProps) {
  const { isLoggedIn = false, onLogout, onHeadlineClick } = props;
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-6">
      <div className="container mx-auto px-4">
        {isLoggedIn && onLogout && (
          <div className="flex justify-end mb-4 md:absolute md:right-4 md:top-6 md:mb-0">
            <button
              onClick={onLogout}
              aria-label="Logout"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
        <div className="text-center">
          <h1
            className="text-3xl font-bold text-green-500 cursor-pointer hover:underline"
            onClick={typeof onHeadlineClick === 'function' ? onHeadlineClick : undefined}
          >
            Your Personalized Festival Clashfinder
          </h1>
          <p className="text-gray-400 mt-2">
            Create a custom Clashfinder link using your Spotify likes or a playlist.
          </p>
        </div>
      </div>
    </header>
  )
}
