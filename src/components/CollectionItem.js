import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import {
  BsCircleFill,
  BsRecordCircle,
  BsSquareFill,
  BsTriangleFill,
  BsHexagonFill,
  BsNutFill,
  BsXCircleFill,
  BsPencilSquare,
  BsStars,
  BsEmojiAngry,
  BsHandThumbsUp,
} from "react-icons/bs";

const CollectionItem = (props) => {
  const [item, setItem] = useState(null);
  const shapeIconMap = new Map([
    ["CIRCLE", BsCircleFill],
    ["ELLIPSE", BsCircleFill],
    ["CIRCLE_DOT", BsRecordCircle],
    ["SQUARE", BsSquareFill],
    ["TRIANGLE", BsTriangleFill],
    ["HEXAGON", BsHexagonFill],
    ["HEXAGON_DOT", BsNutFill],
  ]);

  useEffect(() => {
    setItem(props.item);
  }, [props.item]);

  const getComponent = () => {
    if (!item) {
      return <></>;
    }

    let TagName = shapeIconMap.get(item.shape);
    if (!TagName) {
      TagName = shapeIconMap.get("CIRCLE");
    }

    const itemClass = item.status.toLowerCase().replaceAll("_", "-");

    return (
      <Col className="d-flex justify-content-center align-items-center">
        <div
          className={`collection-item ${itemClass} w-100 h-100 p-2 d-flex flex-column justify-content-center align-items-center`}
        >
          <div className="header mb-1 w-100 align-self-start d-flex justify-content-between">
            <div className="start">
              <BsPencilSquare className="icon" />
            </div>
            <div className="end">
              <BsXCircleFill className="icon" />
            </div>
          </div>

          <div className="color-name mt-auto mb-2 text-center">
            {item.colorName}
          </div>
          <div className="color mt-auto">
            <TagName
              size="3.5em"
              color={item.color ? item.color : "var(--bs-gray-300)"}
              style={{
                paintOrder: "fill",
                stroke: "var(--outline)",
                strokeWidth: "0.4",
                overflow: "visible",
                transform: `${
                  item.shape === "ELLIPSE" ? "scale(1.4, 0.8)" : "none"
                }`,
              }}
            />
          </div>
          <div className="color-code">{item.colorCode}</div>

          <div className="footer mt-1 w-100 align-self-start d-flex justify-content-between">
            <div className="start">
              {item.status === "OWN" && (
                <BsHandThumbsUp className="icon status" />
              )}
              {item.status === "WANT" && <BsStars className="icon status" />}
              {item.status === "DO_NOT_WANT" && (
                <BsEmojiAngry className="icon status" />
              )}
            </div>
            <div className="end">
              {item.qty > 0 && <span className="text">x{item.qty}</span>}
            </div>
          </div>
        </div>
      </Col>
    );
  };

  return getComponent();
};

export default CollectionItem;
