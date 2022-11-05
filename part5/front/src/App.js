import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Notif from './components/Notif'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [sortLiked, setSortLiked] = useState(false)
  const [sortedBlogs, setSortedBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('AKAppSessionID')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'AKAppSessionID', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 2500)

    }
    
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(response => {
      setBlogs(blogs.concat.response.data)
      setNotification ('successfully added blog!')
      setTimeout(() => {
        setNotification(null)
      }, 2500)
    })
    .catch(error =>{
      setNotification(error.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 2500)
    })
  }

  const updateBlog = (blogObject) => {
    blogService
    .update(blogObject)
    .then(response => {
      setBlogs(blogs.map(item => item.id === blogObject.id ? blogObject : item));
    })
    .catch(error => {
      setNotification(error.response.data.error)

    })


  }



  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('AKAppSessionID')
    setUser(null)
  }
  const loginForm = () => (
    <div>
      <h1>Login </h1>
    <form onSubmit={handleLogin}>
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
    </div>
  )
  const blogFormRef = useRef()

  const blogRendering = (blogs) => (
    <div>
      <h2>blogs</h2> 
      <button onClick={logout}>logout</button>
      <Togglable buttonLabel = 'create' ref={blogFormRef}>
      <NewBlog createBlog={createBlog}/>
     </Togglable>
     <br/>


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} user={user} updateBlog={updateBlog} />
      )}
    </div>

  )

  const handleSortLiked = (event) => {
    setSortLiked(!sortLiked)
    setSortedBlogs([...blogs].sort((a, b) => (a.likes > b.likes) ? -1 : 1))
  }

  





  return (
    <div>
      <Notif message={notification} />
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={handleSortLiked}>{sortLiked ? 'sort by date created' : 'sort by liked'}</button>
        {sortLiked ? blogRendering(sortedBlogs) : blogRendering(blogs)}
      </div>
    }

    </div>
  )
}

export default App
