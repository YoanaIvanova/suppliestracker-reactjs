import { shapeIconMap, defaultsMap } from "../utils/CollectionsHelper";

const Shape = (props) => {
  let TagName = null;
  let shape = shapeIconMap.get(props.shape);

  if (shape && shape.icon) {
    TagName = shape.icon;
  } else {
    TagName = shapeIconMap.get(defaultsMap.get("shape")).icon;
  }

  return (
    <TagName
      size={props.size ? props.size : defaultsMap.get("shapeSize")}
      color={props.color ? props.color : defaultsMap.get("shapeColor")}
      style={{
        paintOrder: "fill",
        stroke: `${defaultsMap.get("strokeColor")}`,
        strokeWidth: `${
          shape?.strokeWidth
            ? shape.strokeWidth
            : defaultsMap.get("strokeWidth")
        }`,
        overflow: "visible",
        transform: `${props.shape === "ELLIPSE" ? "scale(1.4, 0.8)" : "none"}`,
      }}
    />
  );
};

export default Shape;
