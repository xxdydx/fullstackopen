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
  const [error, setError] = useState(null)
  const [success, setSuccess] =useState(null)
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




  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService
        .create(blogObject)
      setSuccess(
        `Blog ${blogObject.title} was successfully added`
      )
      setBlogs(blogs.concat(createdBlog))
      setError(null)
      setTimeout(() => {
        setSuccess(null)
      }, 4000)
    } catch(exception) {
      setError(
        `Cannot add blog ${blogObject.title}`
      )
      setSuccess(null)
      setTimeout(() => {
        setSuccess(null)
      }, 4000)
    }
  }

  const updateBlog = (blogObject) => {
    blogService
    .update(blogObject)
    .then(response => {
      setBlogs(blogs.map(item => item.id === blogObject.id ? blogObject : item));
      
    })
    .catch(error => {
      setError(error.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 4000)

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
        setSuccess(`Successfully deleted`);
        setTimeout(() => {
          setSuccess(null)
        }, 4000)
      })
      .catch(error => {
        setError(error.response.data.error)
        setTimeout(() => {
          setError(null)
        }, 4000)
  
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
      <Notif error={error} success={success} setError={setError} setSuccess={setSuccess}/>
      {user === null ?
      SignIn(setUser,setUsername,setPassword,setError) :
      <div>
        <p>{user.username} logged-in</p>
        {blogRendering(blogs)}
      </div>
    }

    </div>
  )
}

export default App
