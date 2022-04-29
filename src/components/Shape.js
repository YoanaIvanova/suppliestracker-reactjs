import { shapeIconMap } from "../utils/CollectionsHelper";

const Shape = (props) => {
  let TagName = shapeIconMap.get(props.shape);
  if (!TagName) {
    TagName = shapeIconMap.get("CIRCLE");
  }

  return (
    <TagName
      size={props.size ? props.size : "3.5em"}
      color={props.color ? props.color : "var(--bs-gray-300)"}
      style={{
        paintOrder: "fill",
        stroke: "var(--outline)",
        strokeWidth: "0.4",
        overflow: "visible",
        transform: `${props.shape === "ELLIPSE" ? "scale(1.4, 0.8)" : "none"}`,
      }}
    />
  );
};

export default Shape;
