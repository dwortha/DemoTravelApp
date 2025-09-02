import React, { useState } from 'react'
import Weather from './components/Weather'
import Activities from './components/Activities'

export default function App() {
  const [location, setLocation] = useState('')
  const [submittedLocation, setSubmittedLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedLocation(location)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Travel Planner</h1>

      <form onSubmit={handleSubmit} className="flex justify-center mb-6">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city"
          className="px-4 py-2 rounded-l-lg border border-gray-300 w-64"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Get Info
        </button>
      </form>

      {submittedLocation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Weather location={submittedLocation} />
          <Activities location={submittedLocation} />
        </div>
      )}
    </div>
  )
}