import { useState, useEffect, createContext } from "react";

import { getCollections } from "../utils/CollectionsHelper";

export const CollectionsContext = createContext();

const CollectionsProvider = (props) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setCollections(getCollections());
  }, []);

  return (
    <CollectionsContext.Provider value={collections}>
      {props.children}
    </CollectionsContext.Provider>
  );
};

export default CollectionsProvider;
