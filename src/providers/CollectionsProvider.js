import { useState, useEffect, createContext } from "react";

import {
  initCollections,
  persistCollections,
  reinitCollections,
} from "../utils/CollectionsHelper";

export const CollectionsContext = createContext();

const CollectionsProvider = (props) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    initCollections(setCollections);
  }, []);

  const getCollectionWithId = (id) => {
    return collections.filter((col) => col.id === Number(id))[0];
  };

  const removeCollectionWithId = (id) => {
    const newCollections = collections.filter((col) => col.id !== id);
    setCollections(newCollections);
    persistCollections(newCollections);
  };

  const resetCollections = () => {
    reinitCollections(setCollections);
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        getCollectionWithId,
        removeCollectionWithId,
        resetCollections,
      }}
    >
      {props.children}
    </CollectionsContext.Provider>
  );
};

export default CollectionsProvider;
