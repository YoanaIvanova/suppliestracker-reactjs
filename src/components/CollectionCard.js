import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

const CollectionCard = (props) => {
  return (
    <Card className="collection-card w-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{props.collection.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          {props.collection.items.length} items
        </Card.Subtitle>
        <Card.Text>{props.collection.description}</Card.Text>
        <Link
          className="btn btn-secondary view-link mt-auto d-flex align-items-center justify-content-center"
          role="button"
          to="/collection"
        >
          <FaRegEye className="me-1" />
          View colleciton
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CollectionCard;
