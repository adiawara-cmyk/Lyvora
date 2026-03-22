export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="text-center space-y-6 px-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Lyvora</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-lg">
          Global Health Access Platform
        </p>
        <p className="text-gray-500 max-w-md">
          Find available doctors near you, anywhere in the world. Book instantly.
          Get care within the hour.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors">
            Find a Doctor
          </button>
          <button className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors">
            I&apos;m a Doctor
          </button>
        </div>
      </div>
    </main>
  );
}
