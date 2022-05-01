import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Modal, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { CollectionsContext } from "../providers/CollectionsProvider";
import CollectionItem from "../components/CollectionItem";
import AddNewButton from "../components/AddNewButton";
import ItemForm from "../components/ItemForm";
import Searchbar from "../components/Searchbar";
import { defaultsMap, itemStatusMap } from "../utils/CollectionsHelper";

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

  const filterByStatus = (status) => {
    let result = [...collection?.items];

    if (status !== "ALL") {
      result = collection?.items?.filter((item) => item.status === status);
    }

    setSearchItems(result);
  };

  const sortItems = (property) => {
    let result = [...collection?.items];

    if (property !== "0") {
      result.sort((a, b) => a[property].localeCompare(b[property]));
    }

    setSearchItems(result);
  };

  const statusOptions = [];
  [...itemStatusMap.keys()].forEach((key, index) => {
    let IconTagName = itemStatusMap.get(key).icon;
    statusOptions.push(
      <Dropdown.Item
        key={index}
        eventKey={key}
        className="d-flex align-items-center"
      >
        <IconTagName className="text-primary me-2" />
        {itemStatusMap.get(key).text}
      </Dropdown.Item>
    );
  });

  return (
    <Container fluid>
      <Row className="mt-4 mb-3 px-2 px-sm-4 justify-conent-center align-items-center">
        <Col xs={2} className="d-flex justify-content-start align-items-center">
          <AddNewButton text="Add new item" action={handleAddModalShow} />
        </Col>
        <Col xs={10} sm={7} className="text-center mt-0">
          <h1
            className="display-4 collection-heading mb-0"
            style={{
              background: `linear-gradient(${
                collection?.titleColor1
                  ? collection?.titleColor1
                  : defaultsMap.get("titleColor1")
              }, ${
                collection?.titleColor2
                  ? collection?.titleColor2
                  : defaultsMap.get("titleColor2")
              })`,
            }}
          >
            {collection?.name}
          </h1>
        </Col>
        <Col xs={12} sm={3} className="d-flex mt-0 justify-content-end">
          <Searchbar onSearch={handleSearch} />
        </Col>
        <Col
          xs={12}
          className="d-flex mt-3 mt-lg-1 justify-content-center justify-content-sm-end"
        >
          <Dropdown
            className="status-dropdown me-2"
            onSelect={(key) => {
              sortItems(key);
            }}
          >
            <Dropdown.Toggle
              variant="secondary"
              className="d-flex align-items-center"
            >
              Sort by
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={0} className="d-flex align-items-center">
                Default
              </Dropdown.Item>

              <Dropdown.Item
                eventKey="colorName"
                className="d-flex align-items-center"
              >
                Color Name
              </Dropdown.Item>

              <Dropdown.Item
                eventKey="colorCode"
                className="d-flex align-items-center"
              >
                Color Code
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            className="status-dropdown"
            onSelect={(key) => {
              filterByStatus(key);
            }}
          >
            <Dropdown.Toggle
              variant="secondary"
              className="d-flex align-items-center"
            >
              Filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                eventKey={"ALL"}
                className="d-flex align-items-center"
              >
                All
              </Dropdown.Item>

              {statusOptions}
            </Dropdown.Menu>
          </Dropdown>
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
