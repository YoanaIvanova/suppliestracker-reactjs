import { useState, useContext } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { BsXCircleFill, BsPencilSquare } from "react-icons/bs";

import { CollectionsContext } from "../providers/CollectionsProvider";
import CollectionStatusChart from "./CollectionStatusChart";
import CollectionForm from "./CollectionForm";

const CollectionCard = (props) => {
  const [showMore, setShowMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const collectionsContext = useContext(CollectionsContext);
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

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => setShowDeleteModal(true);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = () => setShowEditModal(true);

  return (
    <Card className="collection-card w-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-1 d-flex justify-content-between">
          <div className="title">{props.collection.name}</div>
          <div className="actions">
            <BsPencilSquare
              className="icon me-2"
              onClick={handleEditModalShow}
            />
            <BsXCircleFill className="icon" onClick={handleDeleteModalShow} />
          </div>
        </Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          {props.collection.items?.length} items
        </Card.Subtitle>

        <Row className="mb-3 justify-content-center align-items-center">
          <Col md={7}>
            <Card.Text className="d-flex flex-column">
              <span
                className={`${
                  shouldTruncate && showMore
                    ? "description expanded"
                    : "description"
                }`}
              >
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

        <Row className="align-items-center mt-auto">
          <Col xs={{ span: 12, order: 2 }} sm={{ span: 6, order: 1 }}>
            <Link
              className="btn btn-secondary view-link d-flex align-items-center justify-content-center"
              role="button"
              to={`/collection/${props.collection.id}`}
            >
              <FaRegEye className="me-1" />
              Details
            </Link>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            sm={{ span: 6, order: 2 }}
            className="d-flex justify-content-end mb-2 mb-sm-0"
          >
            {props.collection?.defaultBrand && (
              <small className="text-muted text-end">
                {props.collection.defaultBrand}
              </small>
            )}
          </Col>
        </Row>

        <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Remove collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this collection?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleDeleteModalClose}>
              No
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteModalClose();
                collectionsContext.removeCollectionWithId(props.collection.id);
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CollectionForm collection={props.collection} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleEditModalClose}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              type="submit"
              form="collection-form"
              onClick={() => handleEditModalClose()}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default CollectionCard;
