const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  likes = 0
  blogs.forEach(variable => {
    likes += Number(variable.likes)
  })
  return likes
}

const favoriteBlog = (blogs) => {
  if(blogs.length==0){
    return null
  }
  let blog = blogs[0]
  blogs.forEach(variable => {
    if(variable.likes > blog.likes){
      blog = variable
    }
  })
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

