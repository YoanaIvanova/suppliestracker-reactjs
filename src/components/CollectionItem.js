import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import {
  BsCircleFill,
  BsRecordCircle,
  BsSquareFill,
  BsTriangleFill,
  BsHexagonFill,
  BsNutFill,
} from "react-icons/bs";

const CollectionItem = (props) => {
  const [item, setItem] = useState(null);
  const shapeMap = new Map([
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

    let TagName = shapeMap.get(item.shape);

    if (!TagName) {
      TagName = shapeMap.get("CIRCLE");
    }

    return (
      <Col className="d-flex justify-content-center align-items-center">
        <div className="collection-item w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <div className="color-name mb-2 text-center">{item.colorName}</div>
          <div className="color">
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
        </div>
      </Col>
    );
  };

  return getComponent();
};

export default CollectionItem;
