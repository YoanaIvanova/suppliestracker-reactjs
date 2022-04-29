import { useState, useContext } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

import { CollectionsContext } from "../providers/CollectionsProvider";
import CollectionCard from "../components/CollectionCard";
import AddNewButton from "../components/AddNewButton";
import CollectionForm from "../components/CollectionForm";

const CollectionsList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const collectionsContext = useContext(CollectionsContext);

  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  return (
    <Container fluid>
      <Row className="mt-4 mb-3 px-4 justify-conent-center align-items-center">
        <Col
          xs={2}
          className="d-flex justify-content-center justify-content-md-start align-items-center"
        >
          <AddNewButton text="Add new collection" action={handleAddModalShow} />
        </Col>
        <Col xs={8} className="text-center mt-2 mt-md-0">
          <h1 className="fw-bold mb-0">Overview</h1>
        </Col>
        <Col
          xs={2}
          className="d-flex mt-2 mt-md-0 justify-content-center justify-content-md-end"
        >
          <Button
            variant="primary"
            onClick={() => collectionsContext.resetCollections()}
          >
            Reset
          </Button>
        </Col>
      </Row>
      <Row className="px-4 row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-rt-6">
        {collectionsContext.collections.map((collection, index) => (
          <Col
            key={index}
            className="collection-wrapper d-flex justify-content-center"
          >
            <CollectionCard collection={collection} />
          </Col>
        ))}
      </Row>

      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CollectionForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddModalClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            type="submit"
            form="collection-form"
            onClick={() => handleAddModalClose()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CollectionsList;
