import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [BlogObj, setBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const likeIncreases = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlog(updatedBlog)
  }

  const removeBlog = () => props.deleteBlog(blog)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonLabel = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {BlogObj.likes} <button id='like-button' onClick={likeIncreases}>like</button></p>
        {blog.user ? <p> {blog.user.name} </p> : ""}
        <button id='remove' onClick={removeBlog}>remove</button>
      </div>
    </div> 
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog