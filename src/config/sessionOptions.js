// Options object for the session middleware.
export const sessionOptions = {
  name: process.env.SESSION_NAME || 'retro-canvas', // Don't use default session cookie name.
  secret: process.env.SESSION_SECRET, // Change it!!! The secret is used to hash the session with HMAC.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax',
    path: '/retro-canvas'
  }
}

if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.secure = true // serve secure cookies
}
