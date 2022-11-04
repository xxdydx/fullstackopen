import {useState} from 'react'

const Blog = ({blog,user}) => {
  const [view, setView] = useState(false)
  const buttonText = view ? "hide" : "view";
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const handleLikes = ({blogs, updateBlog}) => {
  const oldBlog = blogs.filter(b => b.id === blog.id)
  const likedBlog = {
    title: oldBlog.title,
    author:oldBlog.author,
    likes:oldBlog.likes +1,
    url:oldBlog.url
  }
  updateBlog(likedBlog)
  console.log(likedBlog)
 
}


return (
  <div style={blogStyle}>
  {blog.title} {blog.author}  <button onClick={() => setView(!view)}>{buttonText}</button>
            {
                view ? (
                    <div>
                    {blog.url} <br/>
                    likes {blog.likes} <button onClick={(handleLikes)}>like</button> <br/>
                    {user.name} <br />
                    </div>
                )

                : null
            }

        </div> 
   
)
}
export default Blog