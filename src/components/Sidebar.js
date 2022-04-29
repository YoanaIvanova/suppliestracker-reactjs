import { Accordion, Nav, Navbar, Badge } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const collectionsContext = useContext(CollectionsContext);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [accordionActiveKey, setAccordionActiveKey] = useState(
    location.pathname.indexOf("collection/") !== -1 ? "collection/" : ""
  );

  useEffect(() => {
    setAccordionActiveKey(
      location.pathname.indexOf("collection/") !== -1 ? "collection/" : ""
    );
  }, [location]);

  return (
    <>
      <Navbar bg="primary" className="top-mobile-navbar d-lg-none px-3">
        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="text-secondary"
        >
          <GiHamburgerMenu size="1.2em" />
        </Navbar.Toggle>
        <Navbar.Brand as={Link} to="/collections" className="ps-3">
          <GiPencilBrush size="1.5em" className="me-2" />
          <span className="font-logo">Supplies Tracker</span>
        </Navbar.Brand>
      </Navbar>

      <div
        className={`collapse ${
          showMobileNav ? "show" : ""
        } sidebar h-100 bg-primary px-4 d-lg-block`}
      >
        <Nav className="flex-column sidebar-menu">
          <Navbar.Brand as={Link} to="/collections" className="p-0 mt-5 mb-4">
            <GiPencilBrush size="1.5em" className="me-2" />
            <span className="font-logo">Supplies Tracker</span>
          </Navbar.Brand>

          <Nav.Link
            className="collapse-close d-lg-none text-end pe-0"
            onClick={() => setShowMobileNav(false)}
          >
            <AiOutlineCloseSquare size="2em" />
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/collections"
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <BsGrid1X2Fill className="me-2" />
              Overview
            </span>
          </Nav.Link>

          <Accordion
            as={Nav.Item}
            activeKey={accordionActiveKey}
            onSelect={(e) => setAccordionActiveKey(e)}
          >
            <Accordion.Item className="bg-primary" eventKey="collection/">
              <Accordion.Button
                as={NavLink}
                to="/collection"
                onClick={(e) => e.preventDefault()}
                className="d-flex justify-content-between align-items-center nav-link"
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
                      as={NavLink}
                      to={`/collection/${collection.id}`}
                      className="d-flex justify-content-between"
                    >
                      <span>{collection.name}</span>
                      <span>{collection.items?.length}</span>
                    </Nav.Link>
                  </Nav>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Nav.Link
            as={NavLink}
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

          <Nav.Link
            as={NavLink}
            to="/wishlist"
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <GiRainbowStar size="1.3em" className="me-1" />
              Wishlist
            </span>
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
