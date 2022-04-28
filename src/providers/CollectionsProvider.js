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

  const addEditCollection = (collection) => {
    let newCollections = [...collections];

    if (collection.id) {
      let collectionIndex = collections.findIndex(
        (col) => col.id === Number(collection.id)
      );
      let newCollection = collections.find(
        (col) => col.id === Number(collection.id)
      );

      if (newCollection) {
        newCollection.name = collection.name;
        newCollection.description = collection.description;
        newCollection.defaultItemShape = collection.defaultItemShape;
        newCollection.defaultBrand = collection.defaultBrand;

        newCollections[collectionIndex] = newCollection;
      }
    } else {
      newCollections.push(collection);
    }

    setCollections(newCollections);
    persistCollections(newCollections);
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
        addEditCollection,
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
