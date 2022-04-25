import { Accordion, Nav, Navbar, Badge } from "react-bootstrap";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  GiPencilBrush,
  GiHamburgerMenu,
  GiHearts,
  GiRainbowStar,
} from "react-icons/gi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { ImPencil2 } from "react-icons/im";
import { BsGrid1X2Fill } from "react-icons/bs";

import { CollectionsContext } from "../providers/CollectionsProvider";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const collectionsContext = useContext(CollectionsContext);

  return (
    <>
      <Navbar bg="primary" className="top-mobile-navbar d-lg-none px-3">
        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setShow(!show)}
          className="text-secondary"
        >
          <GiHamburgerMenu size="1.2em" />
        </Navbar.Toggle>
        <Navbar.Brand href="#home" className="ps-3">
          <GiPencilBrush size="1.5em" className="me-2" />
          <span className="font-logo">Supplies Tracker</span>
        </Navbar.Brand>
      </Navbar>

      <div
        className={`collapse ${
          show ? "show" : ""
        } sidebar h-100 bg-primary px-4 d-lg-block`}
      >
        <Nav defaultActiveKey="/home" className="flex-column sidebar-menu">
          <Navbar.Brand href="#home" className="p-0 mt-5 mb-4">
            <GiPencilBrush size="1.5em" className="me-2" />
            <span className="font-logo">Supplies Tracker</span>
          </Navbar.Brand>

          <Nav.Link
            className="collapse-close d-lg-none text-end pe-0"
            onClick={() => setShow(!show)}
          >
            <AiOutlineCloseSquare size="2em" />
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/collections"
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <BsGrid1X2Fill className="me-2" />
              All Collections
            </span>
          </Nav.Link>

          <Accordion as={Nav.Item}>
            <Accordion.Item className="bg-primary" eventKey="0">
              <Accordion.Button
                as={Nav.Link}
                className="d-flex justify-content-between align-items-center"
              >
                <span>
                  <ImPencil2 className="me-2" />
                  Collections
                  <Badge pill className="bg-light ms-2">
                    {collectionsContext.collections.length}
                  </Badge>
                </span>
              </Accordion.Button>

              <Accordion.Body>
                {collectionsContext.collections.map((collection, index) => (
                  <Nav key={index} className="flex-column">
                    <Nav.Link
                      as={Link}
                      to={`/collection/${collection.id}`}
                      className="d-flex justify-content-between"
                    >
                      <span>{collection.name}</span>
                      <span>{collection.items.length}</span>
                    </Nav.Link>
                  </Nav>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Nav.Link
            as={Link}
            to="/favorites"
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <GiHearts className="me-2" />
              Favorites
              <Badge pill className="bg-light ms-2">
                999+
              </Badge>
            </span>
          </Nav.Link>

          <Nav.Link eventKey="link-2">
            <GiRainbowStar size="1.3em" className="me-1" />
            Wishlist
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
