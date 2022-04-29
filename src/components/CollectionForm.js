import { useState, useContext } from "react";
import { Form, Dropdown } from "react-bootstrap";

import { shapeIconMap } from "../utils/CollectionsHelper";
import { CollectionsContext } from "../providers/CollectionsProvider";
import Shape from "./Shape";

const CollectionForm = (props) => {
  const [name, setName] = useState(props.collection?.name);
  const [description, setDescription] = useState(props.collection?.description);
  const [defaultItemShape, setDefaultItemShape] = useState(
    props.collection?.defaultItemShape
  );
  const [defaultBrand, setDefaultBrand] = useState(
    props.collection?.defaultBrand
  );

  const collectionsContext = useContext(CollectionsContext);

  const shapeOptions = [];
  [...shapeIconMap.keys()].forEach((key, index) => {
    shapeOptions.push(
      <Dropdown.Item key={index} eventKey={key}>
        <Shape shape={key} size="1.5em" color="var(--bs-primary)" />
      </Dropdown.Item>
    );
  });

  const handleSubmitCollectionForm = () => {
    const collection = {
      id: props.collection?.id,
      name: name,
      description: description,
      defaultItemShape: defaultItemShape,
      defaultBrand: defaultBrand,
    };

    collectionsContext.addEditCollection(collection);
  };

  return (
    <Form
      id="collection-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitCollectionForm();
      }}
    >
      <Form.Group
        className="mb-3 d-flex align-items-center"
        controlId="collectionForm.defaultItemShape"
      >
        <Form.Label className="mb-0 me-2">Default Shape</Form.Label>
        <Dropdown
          className="shape-dropdown"
          onSelect={(key) => {
            setDefaultItemShape(key);
          }}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <Shape
              shape={defaultItemShape}
              size="1.5em"
              color="var(--bs-primary)"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>{shapeOptions}</Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Form.Group className="mb-3" controlId="collectionForm.defaultBrand">
        <Form.Label>Default Brand</Form.Label>
        <Form.Control
          type="text"
          placeholder="Default Brand"
          defaultValue={defaultBrand}
          onChange={(e) => setDefaultBrand(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="collectionForm.name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="collectionForm.description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          defaultValue={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default CollectionForm;
