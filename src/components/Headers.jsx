import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import '../css/style.css'
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

function Headers() {
  const { carts } = useSelector((state) => state.allCart)
  console.log(carts)

  return (
    <div>
      <Navbar
        style={{ height: '60px', backgroundColor: 'black', color: 'white' }}
      >
        <Container>
          <h3 className="text-light">
            <Link to="/" className="text-decoration-none text-light mx-2">
              E-Commerce
            </Link>
          </h3>
          <NavLink to="/cart" className="text-decoration-none text-light mx-2">
            {' '}
            <div id="ex4">
              <span
                className="p1 fa-stack fa-2x has-badge"
                data-count={carts.length}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
            </div>
          </NavLink>
        </Container>
      </Navbar>
      <br />
    </div>
  )
}

export default Headers
