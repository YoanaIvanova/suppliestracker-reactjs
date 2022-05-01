import { useState, useContext } from "react";
import { Form, Dropdown, Row, Col } from "react-bootstrap";

import { shapeIconMap, defaultsMap } from "../utils/CollectionsHelper";
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
  const [titleColor1, setTitleColor1] = useState(
    props.collection?.titleColor1
      ? props.collection?.titleColor1
      : defaultsMap.get("titleColor1")
  );
  const [titleColor2, setTitleColor2] = useState(
    props.collection?.titleColor2
      ? props.collection?.titleColor2
      : defaultsMap.get("titleColor2")
  );

  const collectionsContext = useContext(CollectionsContext);

  const shapeOptions = [];
  [...shapeIconMap.keys()].forEach((key, index) => {
    shapeOptions.push(
      <Dropdown.Item
        key={index}
        eventKey={key}
        className="d-flex align-items-center"
      >
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
      titleColor1: titleColor1,
      titleColor2: titleColor2,
    };

    collectionsContext.addEditCollection(collection);
  };

  return (
    <Form
      id="collection-form"
      className="collection-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitCollectionForm();
      }}
    >
      <Row className="align-items-center">
        <Form.Group
          as={Col}
          xs={3}
          sm={2}
          controlId="collectionForm.titleColor1"
        >
          <Form.Label>Color 1</Form.Label>
          <Form.Control
            type="color"
            defaultValue={titleColor1}
            title="Choose aesthetics color 1"
            onChange={(e) => setTitleColor1(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          as={Col}
          xs={3}
          sm={2}
          controlId="collectionForm.titleColor2"
        >
          <Form.Label>Color 2</Form.Label>
          <Form.Control
            type="color"
            defaultValue={titleColor2}
            title="Choose aesthetics color 2"
            onChange={(e) => setTitleColor2(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} xs={12} sm={8} className="mt-2 mt-sm-0">
          <h1
            className="collection-heading display-4"
            style={{
              background: `linear-gradient(${titleColor1}, ${titleColor2})`,
            }}
          >
            Aesthetics
          </h1>
        </Form.Group>
      </Row>

      <Form.Group className="my-3 pt-3 pt-sm-0" controlId="collectionForm.name">
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
          <Dropdown.Toggle
            variant="secondary"
            id="shape-dropdown"
            className="d-flex align-items-center"
          >
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
    </Form>
  );
};

export default CollectionForm;
