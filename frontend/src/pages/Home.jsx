import { useEffect, useState } from 'react'
import api from '../utils/api'

const Home = () => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const fetchHealth = async () => {
      try {
        const res = await api.get('/health')
        if (!cancelled) setMessage(res.data?.message ?? '')
      } catch (e) {
        if (!cancelled) setError('Failed to load health')
      }
    }
    fetchHealth()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="container mx-auto">
      <div className="text-4xl font-bold text-green-600 text-center mt-10">{message || 'Loading...'}</div>
    </div>
  )
}

export default Home