import { useState, useEffect, createContext } from "react";

import { initCollections } from "../utils/CollectionsHelper";

export const CollectionsContext = createContext();

const CollectionsProvider = (props) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    initCollections(setCollections);
  }, []);

  const getCollectionWithId = (id) => {
    return collections.filter((col) => col.id == id)[0];
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        getCollectionWithId,
      }}
    >
      {props.children}
    </CollectionsContext.Provider>
  );
};

export default CollectionsProvider;
