import React,{ useState } from 'react';
import { Nav, Navbar, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { getCookie, removeCookie } from '../middleware/middleware';
import { useNavigate } from 'react-router-dom';

export default function NavBar({color = "#c7ccec"}) {

  const navigate = useNavigate();
  const logout = () => {
    removeCookie();
    navigate("/signin");
  }
  const cookie = getCookie('nikcookie');

  return (
    <div>
      <Navbar>
        <Navbar.Brand href="#home" className="px-3" style={{color: color}}>
            <strong>Niku419</strong>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  Github
                </Tooltip>
              )}
            >
              <Nav.Link href="https://github.com/niku419" ><FontAwesomeIcon icon={faGithub} size="lg" color={color} /></Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  Linkedin
                </Tooltip>
              )}
            >
              <Nav.Link href="https://linkedin.com/niku-419"><FontAwesomeIcon icon={faLinkedinIn} size="lg" color= {color} /></Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  Instagram
                </Tooltip>
              )}
            >
              <Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon icon={faInstagram} size="lg" color= {color}/></Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  Facebook
                </Tooltip>
              )}
            >
              <Nav.Link href="#"><FontAwesomeIcon icon={faFacebookF} color= {color}size="lg"/></Nav.Link>
            </OverlayTrigger>
            {<OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => (
                <Tooltip id="button-tooltip" {...props}>
                  Logout
                </Tooltip>
              )}
            >
              <Nav.Link href="#" onClick={logout} ><FontAwesomeIcon  icon={faUserLock} size="lg" color= {color}/></Nav.Link>
            </OverlayTrigger>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}