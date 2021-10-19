import './App.css'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

import Artist from '../src/Components/Artist'

//main app page
function App() {
  // Constant part of the api url
  const baseURL = 'https://rest.bandsintown.com/artists/'

  // variables to store state in local storage in order to preserve across browser refresh
  const storedeventsinfo = localStorage.getItem('eventsinfo')
  const storedartistinfo = localStorage.getItem('artistinfo')
  const storedtitle = localStorage.getItem('title')
    ? String(localStorage.getItem('title'))
    : ''

  const storedquery = localStorage.getItem('query')
    ? String(localStorage.getItem('query'))
    : ''
  //events info storing state variable
  const [eventsinfo, seteventsinfo] = useState(storedeventsinfo)
  //artist info storing state variable

  const [artistinfo, setartistinfo] = useState(storedartistinfo)

  //state variable for the search input change & search input submission
  const [title, setTitle] = useState(storedtitle ? storedtitle : '')

  const [query, setQuery] = useState(storedquery ? storedquery : '')
  // used to auto scroll to result after search
  const inputEl = useRef()

  //runs on first render and everytime query changes state. fetches the events json object
  useEffect(() => {
    axios.get(baseURL + query + '/events/?app_id=abc').then((response) => {
      seteventsinfo(response.data)
    })
  }, [query])

  //runs on first render and everytime query changes state. fetches the artist json object
  useEffect(() => {
    axios.get(baseURL + query + '?app_id=abc').then((response) => {
      setartistinfo(response.data)
    })
  }, [query])

  //runs on first render and everytime eventsinfo, artistinfo, title, query changes state.store the state values to local storage upon detecting change
  useEffect(() => {
    localStorage.setItem('eventsinfo', eventsinfo)
    localStorage.setItem('artistinfo', artistinfo)
    localStorage.setItem('title', String(title))

    localStorage.setItem('query', String(query))
  }, [eventsinfo, artistinfo, title, query])

  // runs after the search button has been clicked
  const handleSubmit = (e) => {
    e.preventDefault()
    //changes query to whatever was typed in input therefore trigerring a fetch for the searched artist
    setQuery(title)

    //after 2s it scrolls to the search result, 2 seconds is a buffer for content to load
    setTimeout(() => {
      inputEl.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }, 2000)
  }

  return (
    <Container className='App'>
      {/* the site logo*/}
      <img
        data-testid='logo_img'
        src='./site_name.png'
        alt=''
        className='logo'
      />
      {/*this input group contains the input field and the search icon, it autofocus on the field after page load. The handlesubmit function update the state variable query which indeed leads to artist info being fetch and displayed*/}
      <InputGroup className='mb-3 inputGroup'>
        <FormControl
          ref={(input) => input && input.focus()}
          placeholder='Search for Artists'
          aria-label="Recipient's username"
          aria-describedby='basic-addon2'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <a onClick={handleSubmit}>
          <img
            className='moddedButton'
            src='./searchButton.png'
            alt='search button'
          />
        </a>
      </InputGroup>

      {/* music notes animation content*/}
      <div className='muzieknootjes'>
        <div className='noot-1'>&#9835; &#9833;</div>
        <div className='noot-2'>&#9833;</div>
        <div className='noot-3'>&#9839; &#9834;</div>
        <div className='noot-4'>&#9834;</div>
      </div>
      {/*scroll anchor*/}
      <div ref={inputEl}></div>

      {/*if artist component exists draw it on screen otherwise leave the area blank*/}
      {artistinfo ? (
        <Artist ref={inputEl} eventsinfo={eventsinfo} artistinfo={artistinfo} />
      ) : (
        <div></div>
      )}
    </Container>
  )
}

export default App
