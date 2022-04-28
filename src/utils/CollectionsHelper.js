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
