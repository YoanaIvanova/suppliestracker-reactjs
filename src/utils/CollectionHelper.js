export const initCollections = () => {
  if (!localStorage.getItem("collections")) {
    fetch("data/demo.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        localStorage.setItem("collections", JSON.stringify(data))
      );
  }
};

export const getCollectionsCount = () => JSON.parse(localStorage.getItem("collections")).collections.length;
