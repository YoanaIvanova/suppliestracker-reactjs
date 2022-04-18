import "./Sidebar.scss";

import { Nav, Navbar, Button } from "react-bootstrap";
import { useState } from "react";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar bg="primary" className="top-mobile-navbar d-md-none px-3">
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={() => setShow(!show)}
        >
          <span></span>
        </Navbar.Toggle>
        <Navbar.Brand href="#home" className="ps-3">
          Supplies Tracker
        </Navbar.Brand>
      </Navbar>

      <Nav
        defaultActiveKey="/home"
        className={`collapse ${
          show ? "show" : ""
        } flex-column bg-primary sidebar h-100 d-md-block`}
      >
        <Nav.Link
          className="collapse-close d-md-none"
          onClick={() => setShow(!show)}
        >
          <span className="text-end">X</span>
        </Nav.Link>
        <Nav.Link href="/home">Active</Nav.Link>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav>
    </>
  );
};

export default Sidebar;
