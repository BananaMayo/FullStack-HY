const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new
  Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


describe('Getting blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)})

  test('Unique identifier property is by default id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0].id).toBeDefined()
  })
})


describe('Adding blogs', () => {
  test('Adding blog increases the total amount of blogs', async() => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = await Blog.find({})
    expect(updatedBlog.length).toBe(helper.initialBlogs.length + 1)

    const title = updatedBlog.map(variable => variable.title)
    expect(title).toContain('Canonical string reduction')
  })
})


describe('Deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(variable => variable.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})


describe('Test updating blog', () =>{
  test('update blog', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]

    blogToUpdate.title = "Better title"

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await helper.blogsInDb()
    const blogList = updatedBlogs.map(blog => blog.title)
    expect(blogList).toContain("Better title")
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})