import { useState, useContext } from "react";
import { Form, Dropdown, Row, Col } from "react-bootstrap";

import { shapeIconMap, itemStatusMap } from "../utils/CollectionsHelper";
import { CollectionsContext } from "../providers/CollectionsProvider";
import Shape from "./Shape";

const ItemForm = (props) => {
  const [name, setName] = useState(props.item?.name);
  const [description, setDescription] = useState(props.item?.description);
  const [shape, setShape] = useState(
    props.item?.shape ? props.item.shape : props.defaultItemShape
  );
  const [brand, setBrand] = useState(props.item?.brand);
  const [status, setStatus] = useState(
    props.item?.status ? props.item.status : "OWN"
  );
  const [color, setColor] = useState(
    props.item?.color ? props.item.color : "#fc0000"
  );
  const [colorName, setColorName] = useState(props.item?.colorName);
  const [colorCode, setColorCode] = useState(props.item?.colorCode);
  const [qty, setQty] = useState(
    props.item ? (props.item.qty ? props.item.qty : 0) : 1
  );

  const collectionsContext = useContext(CollectionsContext);

  const handleSubmitItemForm = () => {
    const item = {
      id: props.item?.id,
      name: name,
      description: description,
      shape: shape,
      brand: brand,
      status: status,
      color: color,
      colorName: colorName,
      colorCode: colorCode,
      qty: qty,
    };

    collectionsContext.addEditItemToCollectionWithId(item, props.collectionId);
  };

  const shapeOptions = [];
  [...shapeIconMap.keys()].forEach((key, index) => {
    shapeOptions.push(
      <Dropdown.Item key={index} eventKey={key}>
        <Shape shape={key} size="1.5em" color="var(--bs-primary)" />
      </Dropdown.Item>
    );
  });

  const statusOptions = [];
  [...itemStatusMap.keys()].forEach((key, index) => {
    statusOptions.push(
      <Dropdown.Item key={index} eventKey={key}>
        {itemStatusMap.get(key)}
      </Dropdown.Item>
    );
  });

  return (
    <Form
      id="item-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitItemForm();
      }}
    >
      <Form.Group
        className="mb-3 d-flex align-items-center"
        controlId="itemForm.shape"
      >
        <Form.Label className="mb-0 me-2">Shape</Form.Label>
        <Dropdown
          className="shape-dropdown"
          onSelect={(key) => {
            setShape(key);
          }}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <Shape
              shape={shape ? shape : "CIRCLE"}
              size="1.5em"
              color="var(--bs-primary)"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>{shapeOptions}</Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} xs="3" sm={2} controlId="itemForm.color">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="color"
            defaultValue={color}
            title="Choose item color"
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} xs="4" controlId="itemForm.colorCode">
          <Form.Label>Color Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Color Code"
            defaultValue={colorCode}
            onChange={(e) => setColorCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} xs="5" sm="6" controlId="itemForm.colorName">
          <Form.Label>Color Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Color Name"
            defaultValue={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group
        className="mb-3 d-flex align-items-center"
        controlId="itemForm.shape"
      >
        <Form.Label className="mb-0 me-2">Status</Form.Label>
        <Dropdown
          className="status-dropdown"
          onSelect={(key) => {
            setStatus(key);
          }}
        >
          <Dropdown.Toggle variant="secondary">
            {itemStatusMap.get(status)}
          </Dropdown.Toggle>

          <Dropdown.Menu>{statusOptions}</Dropdown.Menu>
        </Dropdown>
      </Form.Group>

      <Form.Group className="mb-3" controlId="itemForm.qty">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          min="0"
          step="1"
          defaultValue={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="itemForm.brand">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          placeholder="Brand"
          defaultValue={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="itemForm.name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="itemForm.description">
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

export default ItemForm;
