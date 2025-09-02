import React, { useState, useEffect } from 'react'

export default function Activities({ location }) {
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(`activities-${location}`)
    if (saved) {
      setActivities(JSON.parse(saved))
    } else {
      setActivities([])
    }
  }, [location])

  const addActivity = () => {
    if (newActivity.trim()) {
      const updated = [...activities, newActivity]
      setActivities(updated)
      localStorage.setItem(`activities-${location}`, JSON.stringify(updated))
      setNewActivity('')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Activities in {location}</h2>
      <ul className="mb-4 list-disc pl-5">
        {activities.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
      <div className="flex">
        <input
          type="text"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="Add new activity"
          className="px-3 py-2 border rounded-l-lg flex-grow"
        />
        <button
          onClick={addActivity}
          className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600"
        >
          Add
        </button>
      </div>
    </div>
  )
}