import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CollectionsProvider from "./providers/CollectionsProvider";
import CollectionsList from "./views/CollectionsList";
import Collection from "./views/Collection";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <CollectionsProvider>
        <Sidebar />

        <main className="content h-100">
          <Routes>
            <Route exact path="/" element={<CollectionsList />} />
            <Route path="/collections" element={<CollectionsList />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </main>
      </CollectionsProvider>
    </Router>
  );
};

export default App;
