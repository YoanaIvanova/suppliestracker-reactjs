import { useState, useContext } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import {
  BsXCircleFill,
  BsPencilSquare,
  BsStars,
  BsEmojiAngry,
  BsHandThumbsUp,
} from "react-icons/bs";

import { CollectionsContext } from "../providers/CollectionsProvider";
import ItemForm from "./ItemForm";
import Shape from "./Shape";

const CollectionItem = (props) => {
  const collectionsContext = useContext(CollectionsContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => setShowDeleteModal(true);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = () => setShowEditModal(true);

  const getComponent = () => {
    if (!props.item) {
      return <></>;
    }

    const itemClass = props.item.status.toLowerCase().replaceAll("_", "-");

    return (
      <Col className="d-flex justify-content-center align-items-center">
        <div
          className={`collection-item ${itemClass} w-100 h-100 p-2 d-flex flex-column justify-content-center align-items-center`}
          onClick={handleEditModalShow}
        >
          <div className="header mb-1 w-100 align-self-start d-flex justify-content-between">
            <div className="start">
              <BsPencilSquare
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditModalShow();
                }}
              />
            </div>
            <div className="end">
              <BsXCircleFill
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteModalShow();
                }}
              />
            </div>
          </div>

          <div className="color-name mt-auto mb-2 text-center">
            {props.item.colorName}
          </div>
          <div className="color mt-auto">
            <Shape
              shape={
                props.item.shape ? props.item.shape : props.defaultItemShape
              }
              size="3.5em"
              color={props.item.color ? props.item.color : "var(--bs-gray-300)"}
            />
          </div>
          <div className="color-code">{props.item.colorCode}</div>

          <div className="footer mt-1 w-100 align-self-start d-flex justify-content-between">
            <div className="start">
              {props.item.status === "OWN" && (
                <BsHandThumbsUp className="icon status" />
              )}
              {props.item.status === "WANT" && (
                <BsStars className="icon status" />
              )}
              {props.item.status === "DO_NOT_WANT" && (
                <BsEmojiAngry className="icon status" />
              )}
            </div>
            <div className="end">
              {props.item.qty > 0 && (
                <span className="text">x{props.item.qty}</span>
              )}
            </div>
          </div>
        </div>

        <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Remove item</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleDeleteModalClose}>
              No
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                handleDeleteModalClose();
                collectionsContext.removeItemWithIdFromCollectionWithId(
                  props.item.id,
                  props.collectionId
                );
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ItemForm
              item={props.item}
              collectionId={props.collectionId}
              defaultItemShape={props.defaultItemShape}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleEditModalClose}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              type="submit"
              form="item-form"
              onClick={() => handleEditModalClose()}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  };

  return getComponent();
};

export default CollectionItem;
