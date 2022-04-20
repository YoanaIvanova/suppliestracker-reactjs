import { Container, Row, Col } from "react-bootstrap";
import CollectionCard from "../components/Collection/CollectionCard";

const CollectionList = () => {
  return (
    <Container fluid>
      <Row className="text-center mt-4 mb-3">
        <Col>
          <h1 className="fw-bold mb-0">All Collections</h1>
        </Col>
      </Row>
      <Row className="px-4">
        <Col md={4} className="p-2 d-flex justify-content-center">
          <CollectionCard />
        </Col>
        <Col md={4} className="p-2 d-flex justify-content-center">
          <CollectionCard />
        </Col>
        <Col md={4} className="p-2 d-flex justify-content-center">
          <CollectionCard />
        </Col>
        <Col md={4} className="p-2 d-flex justify-content-center">
          <CollectionCard />
        </Col>
        <Col md={4} className="p-2 d-flex justify-content-center">
          <CollectionCard />
        </Col>
        <Col md={4} className="p-2 d-flex justify-content-center">
          <CollectionCard />
        </Col>
        <Col md={4} className="p-2 d-flex justify-content-center">
          <CollectionCard />
        </Col>
        <Col md={4} className="p-2 d-flex justify-content-center">
          <CollectionCard />
        </Col>
      </Row>
    </Container>
  );
};

export default CollectionList;
