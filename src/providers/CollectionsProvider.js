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
        newCollection.titleColor1 = collection.titleColor1;
        newCollection.titleColor2 = collection.titleColor2;

        newCollections[collectionIndex] = newCollection;
      }
    } else {
      if (newCollections && newCollections.length > 0) {
        collection.id = newCollections.at(-1).id + 1;
      } else {
        collection.id = 1;
      }

      collection.items = [];
      newCollections.push(collection);
    }

    setCollections(newCollections);
    persistCollections(newCollections);
  };

  const addEditItemToCollectionWithId = (item, collectionId) => {
    let collectionIndex = collections.findIndex(
      (col) => col.id === Number(collectionId)
    );
    let newCollection = collections.find(
      (col) => col.id === Number(collectionId)
    );
    let newCollections = [...collections];

    if (newCollection) {
      if (item.id) {
        const itemIndex = newCollection.items.findIndex(
          (i) => i.id === item.id
        );
        let newItem = newCollection.items.find((i) => i.id === item.id);

        newItem.name = item.name;
        newItem.description = item.description;
        newItem.shape = item.shape;
        newItem.brand = item.brand;
        newItem.status = item.status;
        newItem.color = item.color;
        newItem.colorName = item.colorName;
        newItem.colorCode = item.colorCode;
        newItem.qty = item.qty;

        newCollection[itemIndex] = newItem;
      } else {
        if (newCollection.items && newCollection.items.length > 0) {
          item.id = newCollection.items?.at(-1)?.id + 1;
        } else {
          item.id = 1;
        }

        newCollection.items.push(item);
      }

      newCollections[collectionIndex] = newCollection;

      setCollections(newCollections);
      persistCollections(newCollections);
    }
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
        addEditItemToCollectionWithId,
        removeItemWithIdFromCollectionWithId,
        resetCollections,
      }}
    >
      {props.children}
    </CollectionsContext.Provider>
  );
};

export default CollectionsProvider;
