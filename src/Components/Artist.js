import '../App.css'
import Container from 'react-bootstrap/Container'
import { useState, useRef } from 'react'
import Image from 'react-bootstrap/Image'
import Events from './Events'
import '../Css/Artist.css'
import React from 'react'

{
  /*this component displays the artist's image, facebook link and events (coloured icon if available otherwise gray)*/
}
const Artist = ({ eventsinfo, artistinfo }) => {
  {
    /*this functions shows/hides the event list section, also autoscrolls to it 1s after button is clicked*/
  }
  const handleEvent = () => {
    setShow(!show)

    setTimeout(() => {
      eventRec.current.scrollIntoView({
        behavior: 'smooth',
      })
    }, 1000)
  }

  {
    /*state variable and its control function -> events section show/dont show*/
  }
  const [show, setShow] = useState(false)

  const eventRec = useRef()

  return (
    <Container className='searchSection'>
      {/*shows image on top which is an overlay that shows the icons and name*/}

      <h1 data-testid='header'>Search Result</h1>
      <div style={{ position: 'relative' }}>
        <Image
          data-testid='artist'
          className='artistPhoto'
          src={artistinfo['image_url']}
          alt='artist'
          fluid
        />
        <div className='overlay'></div>
        <div className='overContent'>
          <a href={artistinfo['facebook_page_url']}>
            <img data-testid='fb_icon' src='./fb.png' alt='' className='img' />
          </a>
          <div data-testid='artist_name' id='artistName'>
            {artistinfo['name']}
          </div>

          {/*from the basic artist json object it fetch upcoming event count, if its more than 0 it makes the event button coloured and clickable else it discolours and disables the event button*/}

          {artistinfo['upcoming_event_count'] ? (
            <div>
              <a
                onClick={() => {
                  handleEvent()
                }}
              >
                <img src='./event.png' alt='' className='img' />
              </a>
            </div>
          ) : (
            <div>
              <img
                data-testid='event_icon'
                id='noEventimg'
                src='./event.png'
                alt=''
              />
            </div>
          )}
        </div>
      </div>
      <div ref={eventRec}></div>
      {/*if show is true show event section else keep it hidden */}

      {show ? (
        <div>
          <Events
            eventsinfo={eventsinfo}
            artistinfo={artistinfo}
            ref={eventRec}
          />
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  )
}

export default Artist
