import React from 'react'
import {
  Container,
  Jumbotron
} from 'reactstrap'

const Home = () => {
  return (
    <Container>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Shop Demo</h1>
          <hr/>
          <p className="lead">This is sample description.</p>
        </Container>
      </Jumbotron>
    </Container>
  )
}

export default Home
