import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <>
      <Sidebar />

      <main className="content h-100">
        <Router>
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
          </Routes>
        </Router>
      </main>
    </>
  );
};

export default App;
