import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useBlogActions } from '../store'
import { useNotificationActions } from '../store'
import { useNavigate } from 'react-router-dom'


const BlogAdditionForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { add } = useBlogActions()
  const { setNotificationMessage, setNotificationStatus } = useNotificationActions(state => ({
    setNotificationMessage: state.setNotificationMessage,
    setNotificationStatus: state.setNotificationStatus
  }))

  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    add({
      title,
      author,
      url
    }).then((returnedBlog) => {
      const notificationMessage = `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      setNotificationMessage(notificationMessage)
      setNotificationStatus('ok')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationStatus(null)
      }, 5000)
      navigate('/')
      setTitle('')
      setAuthor('')
      setUrl('')
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

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            style={{ marginTop: 10 }}
          >
          </TextField>
        </div>
        <div>
          <TextField
            label="author"
            value={author}
            onChange={event => setAuthor(event.target.value)}
            style={{ marginTop: 10 }}
          >
          </TextField>
        </div>
        <div>
          <TextField
            label="url"
            value={url}
            onChange={event => setUrl(event.target.value)}
            style={{ marginTop: 10 }}
          >
          </TextField>
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogAdditionForm
