import React from 'react'
import { render, screen } from '@testing-library/react'
import NoPage from './NoPage'

test('renders 404 message', () => {
  render(<NoPage />)

  const headingElement = screen.getByRole('heading', { level: 1 })

  expect(headingElement).toBeInTheDocument()
  expect(headingElement).toHaveTextContent('404')
})
