import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/message`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setTimeout(() => setLoading(false), 500) // smooth ui transition
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="app-container">
      <h1 className="title">Full Stack App</h1>
      
      <div className="message-box">
        {loading ? (
          <p className="loading">Fetching data from Express backend...</p>
        ) : error ? (
          <p className="message" style={{ color: '#ef4444' }}>Error: {error}</p>
        ) : data ? (
          <>
            <p className="message">{data.message}</p>
            <p className="timestamp">Server Time: {new Date(data.timestamp).toLocaleString()}</p>
          </>
        ) : (
          <p className="message">No data fetched yet.</p>
        )}
      </div>

      <button className="fetch-button" onClick={fetchData} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </button>
    </div>
  )
}

export default App
