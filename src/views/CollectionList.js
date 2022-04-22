import { Container, Row, Col } from "react-bootstrap";

import CollectionCard from "../components/CollectionCard";
import { getCollections } from "../utils/CollectionHelper";

const CollectionList = () => {
  const collections = getCollections();

  return (
    <Container fluid>
      <Row className="text-center mt-4 mb-3">
        <Col>
          <h1 className="fw-bold mb-0">All Collections</h1>
        </Col>
      </Row>
      <Row className="px-4">
        {collections.map((collection, index) => (
          <Col key={index} md={6} lg={6} xl={4} className="p-2 d-flex justify-content-center">
            <CollectionCard collection={collection} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CollectionList;
