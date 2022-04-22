import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CollectionCard = (props) => {
  return (
    <Card className="w-100">
      <Card.Body>
        <Card.Title>{props.collection.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.collection.items.length} items</Card.Subtitle>
        <Card.Text>
          {props.collection.description}
        </Card.Text>
        <Link className="btn btn-secondary" role="button" to="/collection">
          View colleciton
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CollectionCard;
