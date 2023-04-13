const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "6437b90d3e2cc2539cd63f4a",
    title: "Welcome Blog",
    author: "audreyobrien",
    url: "https://shop-grwm.com/outfit-ideas/welcome-blog/",
    likes: 21,
    __v: 0
  },
  {
    _id: "6437b90d3e2dd2539cd63f4a",
    title: "Best lifestyle blog examples",
    author: "Mies Saukko",
    url: "https://firstsiteguide.com/examples-of-blogs/#lifestyle-blogs",
    likes: 132,
    __v: 0
  },
  {
    _id: "6437b90d3e2bb2539cd63f4a",
    title: "Best mom blog examples",
    author: "Mommy",
    url: "https://firstsiteguide.com/examples-of-blogs/#mom-blogs",
    likes: 69,
    __v: 0
  },
  {
    _id: "6437b90d3e2aa2539cd63f4a",
    title: "Best food blog examples",
    author: "Foodie Man",
    url: "https://firstsiteguide.com/examples-of-blogs/#food-blogs",
    likes: 15,
    __v: 0
  },
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('total likes amount with multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(237)
  })
  test('total likes amount equals 0 with empty list', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe ('Favorite blog', () => {
  test('favorite blog is the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
    title: "Best lifestyle blog examples",
    author: "Mies Saukko",
    likes: 132,
    })
  })
  test('empty list test incase of an empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })
})
