import "./Sidebar.scss";

import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Nav
      defaultActiveKey="/home"
      className="flex-column bg-warning sidebar h-100 d-none d-md-block"
    >
      <Nav.Link href="/home">Active</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;
