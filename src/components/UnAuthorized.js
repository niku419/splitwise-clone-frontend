import React from 'react'
import { Container } from 'react-bootstrap'

export default function UnAuthorized() {
  return (
    <React.Fragment>
      <Container style={{height: "75vh"}} fluid className="d-flex justify-content-center align-items-center">
        <div className="heading">
          <div>
            <h2>You don't have access to this route!!</h2>
          </div>
        </div>
      </Container>
      <Container style={{height: "10vh"}}>
        <div className="d-flex justify-content-end">
          <a href="/" role="button" className="btn btn-primary">Go back</a>
        </div>
      </Container>
    </React.Fragment>
  )
}