import { Link } from 'react-router-dom'

const BlogList = ({ blogList = [] }) => {
  const testing = 'testing'

  if (testing === 'no') {
    throw new Error('simulated error') // highlight line
  }
  else {
    return (
      <div>
        <h2>blogs</h2>

        <ul>
          {blogList.map(blog => (
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