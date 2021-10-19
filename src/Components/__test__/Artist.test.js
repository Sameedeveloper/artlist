import { render, screen } from '@testing-library/react'
import React from 'react'
import Artist from '../Artist'
import '@testing-library/jest-dom/extend-expect'

test('checks search result heading', () => {
  const component = render(<Artist eventsinfo={[]} artistinfo={[]} />)
  const logo_img = component.getByTestId('header')
  expect(logo_img.textContent).toBe('Search Result')
})

test('checks facebook icon', () => {
  const component = render(<Artist eventsinfo={[]} artistinfo={[]} />)
  const logo_img = component.getByTestId('fb_icon')
  expect(logo_img.src).toBe('http://localhost/fb.png')
})

test('checks events icon', () => {
  const component = render(<Artist eventsinfo={[]} artistinfo={[]} />)
  const logo_img = component.getByTestId('event_icon')
  expect(logo_img.src).toBe('http://localhost/event.png')
})

test('checks artist name', () => {
  const component = render(
    <Artist
      eventsinfo={[]}
      artistinfo={
        ({ image_url: 'https://photos.bandsintown.com/large/8880255.jpeg' },
        { name: 'Coldplay' })
      }
    />
  )
  const logo_img = component.getByTestId('artist_name')
  expect(logo_img.textContent).toBe('Coldplay')
})

test('checks artist image', () => {
  const component = render(
    <Artist
      eventsinfo={[]}
      artistinfo={{
        image_url: 'https://photos.bandsintown.com/large/8880255.jpeg',
      }}
    />
  )
  const logo_img = component.getByTestId('artist')
  expect(logo_img.src).toBe('https://photos.bandsintown.com/large/8880255.jpeg')
})
