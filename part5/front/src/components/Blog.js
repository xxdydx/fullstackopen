import {useState} from 'react'

const Blog = ({blogs,blog,user,updateBlog}) => {
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
  const oldBlog = blogs.filter(b => b.id === blog.id)
  const blogID = blog.id
  const likedBlog = {
    title: oldBlog[0].title,
    author:oldBlog[0].author,
    likes:oldBlog[0].likes +1,
    url:oldBlog[0].url
  }

  updateBlog(likedBlog,blogID)
  setLikes(likes+1)

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