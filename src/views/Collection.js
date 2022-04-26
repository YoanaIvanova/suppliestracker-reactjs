import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { CollectionsContext } from "../providers/CollectionsProvider";
import CollectionItem from "../components/CollectionItem";

const Collection = () => {
  const { id } = useParams();
  const collectionsContext = useContext(CollectionsContext);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    setCollection(collectionsContext.getCollectionWithId(id));
  }, [collectionsContext, id]);

  return (
    <Container fluid>
      <Row className="text-center mt-4 mb-3">
        <Col>
          <h1 className="display-4 collection-heading mb-0">
            {collection?.name}
          </h1>
        </Col>
      </Row>
      <Row className="items-pane px-2 px-md-4">
        {collection?.items?.map((item, index) => (
          <CollectionItem key={index} item={item} />
        ))}
      </Row>
    </Container>
  );
};

export default Collection;
