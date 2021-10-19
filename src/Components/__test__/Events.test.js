import { render, screen } from '@testing-library/react'
import React from 'react'
import Events from '../Events'
import '@testing-library/jest-dom/extend-expect'

test('checks upcoming event heading', () => {
  const component = render(<Events eventsinfo={[]} artistinfo={[]} />)
  const logo_img = component.getByTestId('heading')
  expect(logo_img.textContent).toBe('Upcoming Events')
})
