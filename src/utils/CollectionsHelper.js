import {
  BsCircleFill,
  BsRecordCircle,
  BsSquareFill,
  BsTriangleFill,
  BsHexagonFill,
  BsNutFill,
} from "react-icons/bs";
import {
  GiAbstract039,
  GiAbstract069,
  GiAbstract091,
  GiAbstract103,
} from "react-icons/gi";

export const shapeIconMap = new Map([
  ["CIRCLE", BsCircleFill],
  ["ELLIPSE", BsCircleFill],
  ["CIRCLE_DOT", BsRecordCircle],
  ["SQUARE", BsSquareFill],
  ["TRIANGLE", BsTriangleFill],
  ["HEXAGON", BsHexagonFill],
  ["HEXAGON_DOT", BsNutFill],
  ["MARKER_CAP_1", GiAbstract091],
  ["MARKER_CAP_2", GiAbstract069],
  ["MARKER_CAP_3", GiAbstract103],
  ["MARKER_CAP_4", GiAbstract039],
]);

export const itemStatusMap = new Map([
  ["OWN", "Own"],
  ["WANT", "Want"],
  ["DO_NOT_WANT", "Do Not Want"],
]);

export const initCollections = (setCollections) => {
  const collectionsJson = localStorage.getItem("collections");

  if (!collectionsJson) {
    fetch("data/demo.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCollections(data.collections);
          localStorage.setItem("collections", JSON.stringify(data.collections));
        }
      });
  } else {
    setCollections(JSON.parse(collectionsJson));
  }
};

export const reinitCollections = (setCollections) => {
  localStorage.removeItem("collections");
  initCollections(setCollections);
};

export const persistCollections = (collections) =>
  localStorage.setItem("collections", JSON.stringify(collections));
