import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blogien testaus', () => {
    const blog = {
        title: "Test render",
        author: "Render",
        url: "www.render.com",
        likes: 1
    }

    let mockUpdate = jest.fn()
    let mockDel = jest.fn()

    test('render title', () => {

        render(<Blog blog={blog} updateBlog={mockUpdate} deleteBlog={mockDel}/>)

        const element = screen.getByText('Test render Render')
        expect(element).toBeDefined()
    })

    test('likejen määrä ja url näkyy', () => {
        const komponentti = render(<Blog blog={blog} updateBlog={mockUpdate} deleteBlog={mockDel}/>)

        const view = komponentti.getByText('view')
        fireEvent.click(view)

        expect(komponentti.container).toHaveTextContent('www.render.com')
        expect(komponentti.container).toHaveTextContent('1')
    })


    test('like napin painallus kaksi kertaa', async () => {    
        const komponentti = render(<Blog blog={blog} updateBlog={mockUpdate} deleteBlog={mockDel}/>)
    
        const user = userEvent.setup()

        const view = komponentti.getByText('view')
        fireEvent.click(view)

        const like = screen.getByText('like')
        await user.click(like)
        await user.click(like)
    
        expect(mockUpdate.mock.calls).toHaveLength(2)
    })
})