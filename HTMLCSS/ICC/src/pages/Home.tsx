import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (!auth) {
      navigate('/auth/login', { replace: true })
    }
  }, [navigate])

  const onLogout = () => {
    localStorage.removeItem('auth')
    navigate('/auth/login', { replace: true })
  }

  return (
    <div className="home-container logged-in">
      <h2 className="home-welcome">Welcome to <span className="brand-accent">Unstop</span></h2>
      <div className="profile-card">
        <div className="avatar" aria-hidden />
        <div className="profile-info">
          <div className="name">Hi, emilys</div>
          <div className="hint">You are successfully logged in</div>
        </div>
        <button className="btn primary purple" onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Home


