import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useBlogActions } from '../store'
import { useNotificationActions } from '../store'

const Blog = ({ blog, userid }) => {
  const navigate = useNavigate()
  const { update, delete: deleteBlogAction } = useBlogActions()
  const { setNotificationMessage, setNotificationStatus } = useNotificationActions(state => ({
    setNotificationMessage: state.setNotificationMessage,
    setNotificationStatus: state.setNotificationStatus
  }))

  if (!blog) return (
    <div style={{ padding: '20px' }}><h1>404 - Page not found</h1>
    </div>
  )

  const increaseLikesOf = (id) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    update(id, updatedBlog).then((returnedBlog) => {
      const notificationMessage = `liked blog ${returnedBlog.title} by ${returnedBlog.author}`
      setNotificationMessage(notificationMessage)
      setNotificationStatus('ok')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    },
    (error) => {
      const notificationMessage = `${error.message}`
      setNotificationMessage(notificationMessage)
      setNotificationStatus('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    })
  }

  const deleteBlog = (id) => {
    deleteBlogAction(id).then(() => {
      const notificationMessage = 'blog deleted'
      setNotificationMessage(notificationMessage)
      setNotificationStatus('ok')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    },
    (error) => {
      const notificationMessage = `${error.message}`
      setNotificationMessage(notificationMessage)
      setNotificationStatus('error')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
      navigate('/')
    }
  }

  const padding = {
    padding: '25px 5px 5px 5px'
  }

  const paddingText = {
    padding: 5
  }

  return (
    <div data-testid={`blog-${blog.id}`}>

      <Typography variant="h5" style={padding}>
        {blog.title}
      </Typography>
      <div style={paddingText}>by {blog.author}</div>
      <div style ={paddingText}>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>

      <div style={paddingText}>
        <span>Added by {blog.user.name}</span>
      </div>

      <div style={paddingText}>
        <span data-testid={`likes-${blog.id}`}>
          {blog.likes} likes
        </span>

        {userid && (
          <Button
            onClick={() => increaseLikesOf(blog.id)}
            data-testid={`like-button-${blog.id}`}
            variant="outlined"
            sx={{ ml: 1 }}
          >
            like
          </Button>
        )}

        {blog.user && blog.user.id === userid && (
          <Button
            onClick={handleDelete}
            data-testid={`delete-button-${blog.id}`}
            variant="outlined"
            color="error"
            sx={{ ml: 1 }}
          >
            remove
          </Button>
        )}
      </div>

    </div>
  )
}

export default Blog