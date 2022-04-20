import "./App.scss";

import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CollectionList from "./views/CollectionList";
import Collection from "./views/Collection";
import Sidebar from "./components/Sidebar/Sidebar";
import { initCollections } from "./utils/CollectionHelper";

const App = () => {
  useEffect(() => {
    initCollections();
  }, []);

  return (
    <Router>
      <Sidebar />

      <main className="content h-100">
        <Routes>
          <Route exact path="/" element={<CollectionList />} />
          <Route path="/collections" element={<CollectionList />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
