import React, { useEffect, useState } from 'react'

export default function Weather({ location }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Open-Meteo API (free, no key needed) - just defaulting to New York coords
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&current_weather=true`
        )
        const data = await res.json()
        setWeather(data.current_weather)
      } catch (err) {
        console.error(err)
      }
    }
    fetchWeather()
  }, [location])

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Weather in {location}</h2>
      {weather ? (
        <p>
          Temperature: {weather.temperature}°C <br />
          Wind Speed: {weather.windspeed} km/h
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}