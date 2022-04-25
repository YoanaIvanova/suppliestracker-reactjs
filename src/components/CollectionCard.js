import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

import CollectionStatusChart from "./CollectionStatusChart";

const CollectionCard = (props) => {
  const [showMore, setShowMore] = useState(false);
  const truncateLength = 60;
  const shouldTruncate = props.collection.description.length > truncateLength;
  const toggleShowMore = () => {
    setShowMore(!showMore);

    const cards = document.querySelectorAll(".collection-card");
    if (showMore) {
      cards.forEach((card) => (card.style.height = "auto"));
    } else {
      cards.forEach((card) => (card.style.height = "fit-content"));
    }
  };

  return (
    <Card className="collection-card w-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1">{props.collection.name}</Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          {props.collection.items.length} items
        </Card.Subtitle>

        <Row className="mb-3 justify-content-center align-items-center">
          <Col md={7}>
            <Card.Text className="d-flex flex-column">
              <span className={`${shouldTruncate && showMore ? "description expanded" : "description"}`}>
                {shouldTruncate
                  ? showMore
                    ? props.collection.description
                    : props.collection.description.slice(0, truncateLength) +
                      "..."
                  : props.collection.description}
              </span>

              {shouldTruncate && (
                <Button
                  variant="link"
                  onClick={toggleShowMore}
                  className="p-0 mt-2 align-self-start text-decoration-none show-more"
                >
                  {showMore ? "Show Less" : "Show More"}
                </Button>
              )}
            </Card.Text>
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
