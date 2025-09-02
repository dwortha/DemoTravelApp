import React, { useEffect, useState } from 'react'

export default function Weather({ location }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [resolvedPlace, setResolvedPlace] = useState(null)

  useEffect(() => {
    // Reset when location changes
    if (!location) {
      setWeather(null)
      setResolvedPlace(null)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchWeather() {
      setLoading(true)
      setError(null)
      setWeather(null)
      setResolvedPlace(null)
      try {
        // 1) Geocode the city name to coordinates (Open-Meteo Geocoding API)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            location
          )}&count=1&language=en&format=json`
        )
        if (!geoRes.ok) throw new Error('Geocoding request failed')
        const geo = await geoRes.json()
        if (!geo.results || geo.results.length === 0) {
          throw new Error('Location not found')
        }

        const place = geo.results[0]
        const { latitude, longitude, name, country, admin1 } = place

        // 2) Fetch current weather for those coordinates
        const wxRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
        if (!wxRes.ok) throw new Error('Weather request failed')
        const wx = await wxRes.json()

        if (cancelled) return
        setWeather(wx.current_weather)
        setResolvedPlace({ name, country, admin1 })
      } catch (err) {
        if (cancelled) return
        setError(err?.message || 'Something went wrong')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchWeather()
    return () => {
      cancelled = true
    }
  }, [location])

  const title = resolvedPlace
    ? `${resolvedPlace.name}${resolvedPlace.admin1 ? ', ' + resolvedPlace.admin1 : ''}${
        resolvedPlace.country ? ', ' + resolvedPlace.country : ''
      }`
    : location || '—'

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Weather in {title}</h2>
      {loading && <p>Loading...</p>}
      {!loading && error && (
        <p className="text-red-600">Could not fetch weather for "{location}": {error}</p>
      )}
      {!loading && !error && weather && (
        <p>
          Temperature: {weather.temperature}°C <br />
          Wind Speed: {weather.windspeed} km/h
        </p>
      )}
    </div>
  )
}