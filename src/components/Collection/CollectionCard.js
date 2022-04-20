import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CollectionCard = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Collection Name</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">999+ items</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Link className="btn btn-secondary" role="button" to="/collection">
          View colleciton
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CollectionCard;
