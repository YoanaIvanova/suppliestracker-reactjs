import { useState, useEffect } from "react";
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
      <TagName
        size="3em"
        color={item.color ? item.color : "var(--bs-gray-300)"}
        style={{
          paintOrder: "fill",
          stroke: "var(--outline)",
          strokeWidth: "0.3",
          overflow: "visible",
          transform: `${item.shape === "ELLIPSE" ? "scale(1.4, 0.8)" : "none"}`,
        }}
      />
    );
  };

  return getComponent();
};

export default CollectionItem;
