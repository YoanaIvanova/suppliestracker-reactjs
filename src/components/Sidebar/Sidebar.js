import "./Sidebar.scss";

import { Accordion, Nav, Navbar, Badge } from "react-bootstrap";
import { useState } from "react";
import {
  GiPencilBrush,
  GiHamburgerMenu,
  GiHearts,
  GiRainbowStar,
} from "react-icons/gi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { ImPencil2 } from "react-icons/im";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar bg="primary" className="top-mobile-navbar d-md-none px-3">
        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setShow(!show)}
          className="text-secondary"
        >
          <GiHamburgerMenu size="1.2em" />
        </Navbar.Toggle>
        <Navbar.Brand href="#home" className="ps-3 text-secondary">
          <GiPencilBrush size="1.5em" className="me-2" />
          <span className="font-accent">Supplies Tracker</span>
        </Navbar.Brand>
      </Navbar>

      <div
        className={`collapse ${
          show ? "show" : ""
        } sidebar h-100 bg-primary px-4 d-md-block`}
      >
        <Nav defaultActiveKey="/home" className="flex-column sidebar-menu">
          <Navbar.Brand href="#home" className="p-0 mt-5 mb-4 text-secondary">
            <GiPencilBrush size="1.5em" className="me-2" />
            <span className="font-accent">Supplies Tracker</span>
          </Navbar.Brand>

          <Nav.Link
            className="collapse-close d-md-none text-secondary text-end pe-0"
            onClick={() => setShow(!show)}
          >
            <AiOutlineCloseSquare size="2em" />
          </Nav.Link>
          <Nav.Link
            className="text-secondary d-flex justify-content-between align-items-center"
            href="/home"
          >
            <span className="menu-item">
              <span className="menu-icon me-2">
                <ImPencil2 />
              </span>
              Collections
              <Badge pill className="bg-light ms-2">
                999+
              </Badge>
            </span>
          </Nav.Link>

          <Accordion as={Nav.Item}>
            <Accordion.Item className="bg-primary">
              <Accordion.Button
                as={Nav.Link}
                className="d-flex justify-content-between align-items-center bg-primary text-secondary"
              >
                <span>
                  <GiHearts className="me-2" />
                  Favorites
                  <Badge pill className="bg-light ms-2">
                    999+
                  </Badge>
                </span>
              </Accordion.Button>

              <Accordion.Body>
                <Nav className="flex-column">
                  <Nav.Link className="text-secondary">Test 1</Nav.Link>
                </Nav>

                <Nav className="flex-column">
                  <Nav.Link className="text-secondary">Test 2</Nav.Link>
                </Nav>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Nav.Link className="text-secondary" eventKey="link-2">
            <GiRainbowStar size="1.3em" className="me-1" />
            Wishlist
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
