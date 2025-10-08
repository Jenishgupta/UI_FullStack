import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type LoginResponse = {
  token: string
  id: number
  username: string
  email?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; email?: string; password?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  // Auto-redirect if already logged in
  useEffect(() => {
    const stored = localStorage.getItem('auth')
    if (stored) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  const isEmailProvided = useMemo(() => email.trim().length > 0, [email])

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string } = {}

    if (username.trim() !== 'emilys') {
      newErrors.username = 'Username must be "emilys".'
    }

    if (isEmailProvided && !EMAIL_REGEX.test(email.trim())) {
      newErrors.email = 'Enter a valid email address (e.g., example@gmail.com).'
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
    }

    setFieldErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!validate()) return

    setSubmitting(true)
    try {
      const body: Record<string, unknown> = {
        username: username.trim(),
        password,
        expiresInMins: remember ? 7 * 24 * 60 : 30,
      }
      if (isEmailProvided) body.email = email.trim()

      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as any)?.message || 'Login failed')
      }

      const data = (await res.json()) as LoginResponse & Record<string, unknown>
      const authPayload = {
        token: data.token,
        user: {
          id: data.id,
          username: data.username,
          email: isEmailProvided ? email.trim() : undefined,
        },
        loginAt: Date.now(),
      }

      localStorage.setItem('auth', JSON.stringify(authPayload))
      navigate('/home', { replace: true })
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-layout login-page">
      <section className="visual-panel">
        <div className="brand">
          <div className="logo-dot" />
          <span className="brand-name">Unstop</span>
        </div>
        <h2 className="visual-heading">Welcome to</h2>
        <p className="visual-sub brand-accent">Unstop</p>
        <div className="visual-art" aria-hidden>
          <img src="/src/assets/illustration.svg" alt="Login Illustration" />
        </div>
      </section>

      <section className="form-panel">
        <form className="auth-card light" onSubmit={onSubmit} noValidate>
          <h1 className="auth-title">Login</h1>
          <p className="auth-subtitle">Please enter your details</p>

          <div className="social-row">
            <button type="button" className="btn social light google" aria-label="Login with Google">
              <span className="icon">G</span> Login with Google
            </button>
            <button type="button" className="btn social light facebook" aria-label="Login with Facebook">
              <span className="icon">f</span> Login with Facebook
            </button>
          </div>

          <div className="divider"><span>or continue with email</span></div>

          <div className="field">
            <label>Username</label>
            <div className={`input light ${fieldErrors.username ? 'invalid' : ''}`}>
              <span className="leading-icon">@</span>
              <input
                type="text"
                placeholder="Enter username (must be emilys)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            {fieldErrors.username && <div className="error-text">{fieldErrors.username}</div>}
          </div>

          <div className="field">
            <label>Email</label>
            <div className={`input light ${fieldErrors.email ? 'invalid' : ''}`}>
              <span className="leading-icon">✉</span>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            {fieldErrors.email && <div className="error-text">{fieldErrors.email}</div>}
          </div>

          <div className="field">
            <label>Password</label>
            <div className={`input light ${fieldErrors.password ? 'invalid' : ''}`}>
              <span className="leading-icon">•</span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                minLength={8}
              />
            </div>
            {fieldErrors.password && <div className="error-text">{fieldErrors.password}</div>}
          </div>

          {error && <div className="banner error">{error}</div>}

          <div className="row between">
            <label className="checkbox">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <a href="#" className="link">Forgot password?</a>
          </div>

          <button type="submit" className="btn primary purple" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </button>

          <div className="row center small">
            <span>Don&apos;t have an account?</span>
            <Link to="#" className="link">Register</Link>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login


