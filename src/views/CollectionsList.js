import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { CollectionsContext } from "../providers/CollectionsProvider";
import CollectionCard from "../components/CollectionCard";

const CollectionsList = () => {
  const collectionsContext = useContext(CollectionsContext);

  return (
    <Container fluid>
      <Row className="mt-4 mb-3 px-4">
        <Col className="d-flex justify-content-between">
          <h1 className="fw-bold mb-0">Overview</h1>
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
    </Container>
  );
};

export default CollectionsList;
