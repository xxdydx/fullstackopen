import { useState } from 'react' 

const NewBlog = ({createBlog}) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
      event.preventDefault()
        const blogObject = {
          title: newTitle,
          author:newAuthor,
          url: newUrl
        }
        createBlog(blogObject)
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')

      }
    

    return (
    <div>
        <h2>create new</h2>

        <form onSubmit = {addBlog}>
            <div>
            title:
            <input value={newTitle} onChange={({target}) => setNewTitle(target.value)} />
            </div>
            <div>
            author:
            <input value={newAuthor} onChange={({target}) => setNewAuthor(target.value)} />
            </div>
            <div>
            url:
            <input value={newUrl} onChange={({target}) => setNewUrl(target.value)} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
      </form>
    </div>

    )

  
}

export default NewBlog
