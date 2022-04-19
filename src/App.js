import "./App.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CollectionsPage from "./pages/CollectionsPage";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <>
      <Sidebar />

      <main className="content h-100">
        <Router>
          <Routes>
            <Route exact path="/" element={<CollectionsPage />} />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
