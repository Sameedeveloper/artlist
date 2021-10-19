import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'
import '@testing-library/jest-dom/extend-expect'

test('checks upcoming event heading', () => {
  const component = render(<App />)
  const logo_img = component.getByTestId('logo_img')
  expect(logo_img.src).toBe('http://localhost/site_name.png')
})
