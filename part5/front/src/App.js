import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Notif from './components/Notif'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import SignIn from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
  const deleteBlog = (id) => {
    const blog1 = blogs.filter(b => b.id === id)
    const title = blog1[0].title
    if(window.confirm(`Do you want to delete ${title}?`)) {
      blogService
      .remove(id)
      .then(response =>{
        setBlogs(blogs.filter(blogs => blogs.id !== id));
        setNotification(`Successfully deleted ${title}`);
        setTimeout(() => {
          setNotification(null)
        }, 2500)
      })
      .catch(error => {
        setNotification(error.response.data.error)
  
      })
    }

  }



  const logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('AKAppSessionID')
    setUser(null)
  }

  const blogFormRef = useRef()

  const blogRendering = (blogs) => (
    <div>
      <h2>blogs</h2> 
      <button onClick={logout}>logout</button>
      <Togglable buttonLabel = 'create' ref={blogFormRef}>
      <NewBlog createBlog={createBlog}/>
     </Togglable>
     <br/>

      {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      )}
    </div>

  )


  

  return (
    <div>
      <Notif message={notification} />
      {user === null ?
      SignIn(setUser,setUsername,setPassword,setNotification) :
      <div>
        <p>{user.username} logged-in</p>
        {blogRendering(blogs)}
      </div>
    }

    </div>
  )
}

export default App
