const NewBlog = ({addBlog, newTitle, titleChange, newAuthor, authorChange, newUrl, UrlChange}) => {

    return (
    <div>
        <h2>create new</h2>

        <form onSubmit = {addBlog}>
            <div>
            title:
            <input value={newTitle} onChange={titleChange} />
            </div>
            <div>
            author:
            <input value={newAuthor} onChange={authorChange} />
            </div>
            <div>
            url:
            <input value={newUrl} onChange={UrlChange} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
      </form>
    </div>

    )

  
}

export default NewBlog
