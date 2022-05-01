import { useState, useContext } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import { BsXCircleFill, BsPencilSquare } from "react-icons/bs";

import { CollectionsContext } from "../providers/CollectionsProvider";
import { itemStatusMap } from "../utils/CollectionsHelper";
import ItemForm from "./ItemForm";
import Shape from "./Shape";
import StatusIcon from "./StatusIcon";

const CollectionItem = (props) => {
  const collectionsContext = useContext(CollectionsContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleDeleteModalShow = () => setShowDeleteModal(true);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleEditModalShow = () => setShowEditModal(true);

  const handleInfoModalClose = () => setShowInfoModal(false);
  const handleInfoModalShow = () => setShowInfoModal(true);

  const getComponent = () => {
    if (!props.item) {
      return <></>;
    }

    const itemClass = props.item.status.toLowerCase().replaceAll("_", "-");
    const itemStatus = itemStatusMap.get(props.item.status);

    return (
      <Col className="d-flex justify-content-center align-items-center">
        <div
          className={`collection-item ${itemClass} w-100 h-100 p-2 d-flex flex-column justify-content-center align-items-center`}
          onClick={handleInfoModalShow}
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
              <StatusIcon
                icon={itemStatus.icon}
                tooltipText={itemStatus.text}
                className="icon status"
              />
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

        <Modal show={showInfoModal} onHide={handleInfoModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Item details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex align-items-center">
              <div className="fw-bold me-2">Item name: </div>
              <div>{props.item?.name}</div>
            </div>

            <div className="d-flex align-items-center">
              <div className="fw-bold me-2">Item description: </div>
              <div>{props.item?.description}</div>
            </div>

            {props.item?.brand && (
              <div className="d-flex align-items-center">
                <div className="fw-bold me-2">Item brand: </div>
                <div>{props.item?.brand}</div>
              </div>
            )}

            <br />

            {props.item?.qty > 0 && (
              <div className="d-flex align-items-center">
                <div className="fw-bold me-2">Quantity: </div>
                <div>{props.item?.qty}</div>
              </div>
            )}

            <div className="d-flex align-items-center">
              <div className="fw-bold me-2">Shape: </div>
              <div>
                <Shape
                  shape={
                    props.item?.shape
                      ? props.item?.shape
                      : props.defaultItemShape
                  }
                  size="1em"
                  color="var(--bs-primary)"
                />
              </div>
              {props.defaultItemShape && !props.item?.shape && (
                <div className="ms-1">(collection default)</div>
              )}
            </div>

            <br />

            <div className="d-flex align-items-center">
              <div className="fw-bold me-2">Color: </div>
              <div
                className="item-color me-1"
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "0.5rem",
                  backgroundColor: props.item?.color,
                }}
              ></div>
              <div>{props.item?.color}</div>
            </div>

            <div className="d-flex align-items-center">
              <div className="fw-bold me-2">Color name: </div>
              <div>{props.item?.colorName}</div>
            </div>

            <div className="d-flex align-items-center">
              <div className="fw-bold me-2">Color code: </div>
              <div>{props.item?.colorCode}</div>
            </div>

            <br />

            <div className="d-flex align-items-center">
              You
              <StatusIcon
                icon={itemStatus.icon}
                className="text-secondary ms-1"
              />
              <span className="fw-bold text-secondary mx-1">
                {itemStatusMap.get(props.item?.status)?.text?.toLowerCase()}
              </span>
              <StatusIcon
                icon={itemStatus.icon}
                className="text-secondary me-1"
              />
              this item.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleInfoModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  };

  return getComponent();
};

export default CollectionItem;
