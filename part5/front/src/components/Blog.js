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


return (
  <div style={blogStyle}>
  {blog.title} {blog.author}  <button onClick={() => setView(!view)}>{buttonText}</button>
            {
                view ? (
                    <div>
                    {blog.url} <br/>
                    likes {blog.likes} <button>like</button> <br/>
                    {user.name} <br />
                    </div>
                )

                : null
            }

        </div> 
   
)
}
export default Blog