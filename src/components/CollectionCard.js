import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

import CollectionStatusChart from "./CollectionStatusChart";

const CollectionCard = (props) => {
  return (
    <Card className="collection-card w-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{props.collection.name}</Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          {props.collection.items.length} items
        </Card.Subtitle>

        <Row className="mb-3 justify-content-center align-items-center">
          <Col md={7}>
            <Card.Text>{props.collection.description}</Card.Text>
          </Col>
          <Col md={5}>
            <CollectionStatusChart items={props.collection.items} />
          </Col>
        </Row>

        <Link
          className="btn btn-secondary view-link mt-auto d-flex align-items-center justify-content-center"
          role="button"
          to="/collection"
        >
          <FaRegEye className="me-1" />
          View details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CollectionCard;
