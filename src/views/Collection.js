import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { CollectionsContext } from "../providers/CollectionsProvider";
import CollectionItem from "../components/CollectionItem";
import AddNewButton from "../components/AddNewButton";
import ItemForm from "../components/ItemForm";
import Searchbar from "../components/Searchbar";

const Collection = () => {
  const [collection, setCollection] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const { id } = useParams();
  const collectionsContext = useContext(CollectionsContext);

  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  useEffect(() => {
    const fetchedCollection = collectionsContext.getCollectionWithId(id);
    setCollection(fetchedCollection);
    setSearchItems(fetchedCollection?.items);
  }, [collectionsContext, id]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    let result = collection?.items?.filter((item) => {
      return (
        item?.colorName?.toLowerCase().search(query) !== -1 ||
        item?.colorCode?.toLowerCase().search(query) !== -1
      );
    });

    setSearchItems(result);
  };

  return (
    <Container fluid>
      <Row className="mt-4 mb-3 px-2 px-sm-4 justify-conent-center align-items-center">
        <Col xs={2} className="d-flex justify-content-start align-items-center">
          <AddNewButton text="Add new item" action={handleAddModalShow} />
        </Col>
        <Col xs={10} sm={7} className="text-center mt-0">
          <h1 className="display-4 collection-heading mb-0">
            {collection?.name}
          </h1>
        </Col>
        <Col xs={12} sm={3} className="d-flex mt-0 justify-content-end">
          <Searchbar onSearch={handleSearch} />
        </Col>
      </Row>
      <Row className="items-pane mb-3 g-3 row-cols-3 row-cols-sm-4 row-cols-md-6 row-cols-xl-8 row-cols-xxl-10 row-cols-rt-16 px-2 px-md-4">
        {searchItems?.map((item, index) => (
          <CollectionItem
            key={index}
            item={item}
            defaultItemShape={collection?.defaultItemShape}
            collectionId={collection?.id}
          />
        ))}
      </Row>

      <Modal show={showAddModal} onHide={handleAddModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ItemForm
            collectionId={collection?.id}
            defaultItemShape={collection?.defaultItemShape}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddModalClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            type="submit"
            form="item-form"
            onClick={() => handleAddModalClose()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Collection;
