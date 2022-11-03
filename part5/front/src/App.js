import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Notif from './components/Notif'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
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


  const addBlog = (event) => {
    const blogObject = {
      title: newTitle,
      author:newAuthor,
      url: newUrl
    }
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(response => {
      setBlogs(blogs.concat.response.data)
      setNotification ('successfully added blog!')
      setTimeout(() => {
        setNotification(null)
      }, 2500)
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
    })
    .catch(error =>{
      setNotification(error.response.data.error)
      setTimeout(() => {
        setNotification(null)
      }, 2500)
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

  const blogRendering = () => (
    <div>
      <h2>blogs</h2> 
      <button onClick={logout}>logout</button>
      <Togglable buttonLabel = 'create' ref={blogFormRef}>
      <NewBlog
      addBlog ={addBlog}
      newAuthor= {newAuthor}
      newTitle={newTitle}
      newUrl = {newUrl}
      titleChange = {({target}) => setNewTitle(target.value)}
      authorChange = {({target}) => setNewAuthor(target.value)}
      UrlChange = {({target}) => setNewUrl(target.value)}
    />
     </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  )
  





  return (
    <div>
      <Notif message={notification} />
      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        {blogRendering()}
      </div>
    }

    </div>
  )
}

export default App
