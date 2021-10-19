import '../App.css'
import Card from 'react-bootstrap/Card'
import '../Css/Events.css'

{
  /*this event object takes the artist and events object */
}

const Events = ({ eventsinfo, artistinfo }) => {
  return (
    <div className='eventsBackground'>
      <h1 data-testid='heading'>Upcoming Events</h1>
      {/*run through the event object extracting venuename,city,country,datetime, also extracts the thumbnail for the artist fron the artist object*/}

      {eventsinfo.map((item) => (
        <span key={eventsinfo['id']}>
          <Card>
            <Card.Title>Event Info</Card.Title>
            <a href={item['offers']['0'] ? item['offers']['0']['url'] : ''}>
              Get Tickets!
            </a>
            <Card.Img
              variant='top'
              src={artistinfo['thumb_url']}
              data-testid='thumbnail'
            />
            <Card.Body>
              <Card.Text>
                {item['venue']['name']} <br /> {item['venue']['city']},
                {item['venue']['country']}, {item['datetime']}
              </Card.Text>
            </Card.Body>
          </Card>
        </span>
      ))}
    </div>
  )
}

export default Events
