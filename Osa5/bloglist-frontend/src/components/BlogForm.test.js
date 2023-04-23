import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './blogform'

test('uuden blogin luominen kutsuu propsia', async () => {
    createBlog = jest.fn()
    const user = userEvent.setup()
    const { container } = render(< BlogForm createBlog={createBlog} />)

    const inputA = container.querySelector('#title')
    const inputB = container.querySelector('#author')
    const inputC = container.querySelector('#url')
    const createButton = screen.getByText('create')

    await user.type(inputA, 'testing a title')
    await user.type(inputB, 'testing an author')
    await user.type(inputC, 'testing an url')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a title')
    expect(createBlog.mock.calls[0][0].author).toBe('testing an author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing an url')
})
