import { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

import { CollectionsContext } from "../providers/CollectionsProvider";
import CollectionCard from "../components/CollectionCard";
import AddNewButton from "../components/AddNewButton";
import CollectionForm from "../components/CollectionForm";

const CollectionsList = () => {
  const [searchCollections, setSearchCollections] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const collectionsContext = useContext(CollectionsContext);

  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  useEffect(() => {
    setSearchCollections(collectionsContext.collections);
  }, [collectionsContext]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    let result = collectionsContext.collections?.filter((collection) => {
      return (
        collection?.name?.toLowerCase().search(query) !== -1 ||
        collection?.defaultBrand?.toLowerCase().search(query) !== -1 ||
        collection?.description?.toLowerCase().search(query) !== -1
      );
    });

    setSearchCollections(result);
  };

  return (
    <Container fluid>
      <Row className="mt-4 mb-3 px-2 px-sm-4 justify-conent-center align-items-center">
        <Col xs={2} className="d-flex justify-content-start align-items-center">
          <AddNewButton text="Add new collection" action={handleAddModalShow} />
        </Col>
        <Col xs={7} className="text-center mt-0">
          <h1 className="fw-bold mb-0 display-4">Overview</h1>
        </Col>
        <Col xs={3} className="d-flex mt-0 justify-content-end">
          <InputGroup className="mb-3">
            <InputGroup.Text id="search">
              <BsSearch />
            </InputGroup.Text>
            <FormControl
              size="lg"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search"
              onChange={(e) => handleSearch(e)}
            />
          </InputGroup>

          {/* <Button
            variant="primary"
            onClick={() => collectionsContext.resetCollections()}
          >
            Reset
          </Button> */}
        </Col>
      </Row>

      <Row className="px-4 row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-rt-6">
        {searchCollections?.map((collection, index) => (
          <Col
            key={index}
            className="collection-wrapper pb-4 d-flex justify-content-center"
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
