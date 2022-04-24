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
          localStorage.setItem("collections", JSON.stringify(data));
        }
      });
  } else {
    setCollections(JSON.parse(collectionsJson).collections);
  }
};