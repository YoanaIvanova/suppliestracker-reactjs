import {
  BsCircleFill,
  BsRecordCircle,
  BsSquareFill,
  BsTriangleFill,
  BsHexagonFill,
  BsNutFill,
  BsStars,
  BsEmojiAngry,
  BsHandThumbsUp,
} from "react-icons/bs";
import {
  GiAbstract039,
  GiAbstract069,
  GiAbstract091,
  GiAbstract103,
} from "react-icons/gi";

export const shapeIconMap = new Map([
  ["CIRCLE", { icon: BsCircleFill, strokeWidth: "0.4" }],
  ["ELLIPSE", { icon: BsCircleFill, strokeWidth: "0.4" }],
  ["CIRCLE_DOT", { icon: BsRecordCircle, strokeWidth: "0.4" }],
  ["SQUARE", { icon: BsSquareFill, strokeWidth: "0.4" }],
  ["TRIANGLE", { icon: BsTriangleFill, strokeWidth: "0.4" }],
  ["HEXAGON", { icon: BsHexagonFill, strokeWidth: "0.4" }],
  ["HEXAGON_DOT", { icon: BsNutFill, strokeWidth: "0.4" }],
  ["MARKER_CAP_1", { icon: GiAbstract091, strokeWidth: "10" }],
  ["MARKER_CAP_2", { icon: GiAbstract069, strokeWidth: "10" }],
  ["MARKER_CAP_3", { icon: GiAbstract103, strokeWidth: "10" }],
  ["MARKER_CAP_4", { icon: GiAbstract039, strokeWidth: "10" }],
]);

export const itemStatusMap = new Map([
  [
    "OWN",
    {
      text: "Own",
      icon: BsHandThumbsUp,
      chartColor: "rgba(69, 204, 105, 1)",
      chartBorderColor: "rgba(255, 255, 255, 1)",
    },
  ],
  [
    "WANT",
    {
      text: "Want",
      icon: BsStars,
      chartColor: "rgba(214, 66, 49, 1)",
      chartBorderColor: "rgba(255, 255, 255, 1)",
    },
  ],
  [
    "DO_NOT_WANT",
    {
      text: "Do not want",
      icon: BsEmojiAngry,
      chartColor: "rgba(49, 120, 214, 1)",
      chartBorderColor: "rgba(255, 255, 255, 1)",
    },
  ],
]);

export const defaultsMap = new Map([
  ["shape", "CIRCLE"],
  ["shapeSize", "3.5em"],
  ["shapeColor", "var(--bs-gray-300)"],
  ["strokeColor", "var(--outline)"],
  ["strokeWidth", "0.4"],
  ["color", "#fc0000"],
  ["status", "OWN"],
  ["qty", 1],
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
