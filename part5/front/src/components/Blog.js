import {useState} from 'react'

const Blog = ({blogs,blog,user,updateBlog, deleteBlog}) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const buttonText = view ? "hide" : "view";
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const handleLikes = (event) => {
  const likedBlog = ({
    ...blog,
    likes: blog.likes + 1
  })

  updateBlog(likedBlog)
  setLikes(likes+1)

}


return (
  <div style={blogStyle}>
  {blog.title} {blog.author}  <button onClick={() => setView(!view)}>{buttonText}</button>
            {
                view ? (
                    <div>
                    <a href={blog.url} target="_blank">link</a> <br/>
                    likes {blog.likes} <button onClick={(handleLikes)}>like</button> <br/>
                    {user.name} <br />
                    <button onClick={()=>deleteBlog(blog.id)}>remove</button>
                    </div>
                )

                : null
            }

        </div> 
   
)
}
export default Blog