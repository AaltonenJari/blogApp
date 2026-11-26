import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Notification from './components/notification'
import {
  Routes, Route, Link, Navigate,
  useMatch
} from 'react-router-dom'
import Blog from './components/Blog'
import BlogAdditionForm from './components/BlogAdditionForm'
import { Button, Container, AppBar, Toolbar, Box, Typography } from '@mui/material'
import ErrorBoundary from './ErrorBoundary'
import { useBlogActions } from './store'
import { useBlogs } from './store'

const App = () => {
  const [user, setUser] = useState(null)
  const blogs = useBlogs()
  const { initialize } = useBlogActions()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const padding = {
    padding: 5
  }

  useEffect(() => {
    initialize()
  }, [initialize])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={padding}>
            Blog App
          </Typography>

          <Box sx={{ ml: 'auto' }}>
            <Button color="inherit" component={Link} to="/blogs" sx={style}>
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/create" sx={style}>
              New Blog
            </Button>

            {!user && (
              <Button color="inherit" component={Link} to="/login" sx={style}>
                Login
              </Button>
            )}

            {user && (
              <span style={padding}>
                <Button color="inherit" onClick={() => handleLogout()} sx={style}>
                  Logout
                </Button>
              </span>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Notification />

      <ErrorBoundary>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={blog}
                userid={user?.id}
              />
            }
          />
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/create" element={user ? <BlogAdditionForm /> : <Navigate to="/login" />} />

          <Route
            path="/login"
            element={
              user
                ? <Navigate to="/" />   // jos kirjautunut → pois login-sivulta
                : <Login setUser={setUser} />
            }
          />
          <Route path="*" element={<div style={{ padding: '20px' }}><h1>404 - Page not found</h1></div>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App