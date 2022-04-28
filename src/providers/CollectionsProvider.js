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
    return collections.find((col) => col.id === Number(id));
  };

  const removeCollectionWithId = (id) => {
    const newCollections = collections.filter((col) => col.id !== Number(id));
    setCollections(newCollections);
    persistCollections(newCollections);
  };

  const removeItemWithIdFromCollectionWithId = (itemId, collectionId) => {
    let collectionIndex = collections.findIndex(
      (col) => col.id === Number(collectionId)
    );
    let newCollection = collections.find(
      (col) => col.id === Number(collectionId)
    );
    let newCollections = [...collections];

    if (newCollection) {
      newCollection.items = newCollection.items.filter(
        (item) => item.id !== Number(itemId)
      );

      newCollections[collectionIndex] = newCollection;

      setCollections(newCollections);
      persistCollections(newCollections);
    }
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
        removeItemWithIdFromCollectionWithId,
        resetCollections,
      }}
    >
      {props.children}
    </CollectionsContext.Provider>
  );
};

export default CollectionsProvider;
