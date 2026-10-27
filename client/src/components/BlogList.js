import { Link } from 'react-router-dom'
import { useBlogs } from '../store'

const BlogList = () => {
  const testing = 'testing'
  const blogs = useBlogs()

  if (testing === 'no') {
    throw new Error('simulated error') // highlight line
  }
  else {
    return (
      <div>
        <h2>blogs</h2>

        <ul>
          {blogs.map(blog => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default BlogList