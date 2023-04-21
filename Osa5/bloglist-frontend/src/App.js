import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/blogform'
import Togglable from './components/Togglable'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const BlogNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    async function FetchData() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    FetchData()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }  
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <h2>Login to application</h2>
        <Notification message={errorMessage} />
        <div>
          username
          <input
           type="text"
           value={username}
           name="Username"
           onChange={({ target }) => setUsername(target.value)}
           />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } 
    catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const showBlogs = () =>(
    <div>
      <h2>blogs</h2>
      <BlogNotification message={successMessage} />
      <div><form onSubmit={logOut}><p>{user.name} logged in <button>logout</button></p></form>
      </div>
      <Togglable buttonLabel= "create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      <br></br>
      {blogs.sort(SortByLikes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )

  const createBlog = async(event) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(event)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService
        .update(BlogToUpdate)

      const blogs = await blogService.getAll()
      setBlogs(blogs)      
    } catch(exception) {
      setErrorMessage(
        `Error updating blog ${BlogToUpdate.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (DeletedBlog) => {
    try {
      if (window.confirm(`Remove blog ${DeletedBlog.title} by ${DeletedBlog.author}?`)) {
        blogService
          .remove(DeletedBlog.id)

        setBlogs(blogs.filter(blog => blog.id !== DeletedBlog.id))
      }
    } catch(exception) {
      setErrorMessage(
        `Failed while deleting blog ${DeletedBlog.title}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const SortByLikes = (x, y) => y.likes - x.likes

  return (
    <div>
        {user === null && loginForm()}
        {user && 
        <div>
            {showBlogs()}
        </div>
        }
    </div>
  )
}

export default App