import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FormData from "./FormData";
import EmployeeList from "./EmployeeList";
import Modify from "./Modify";
import Home from "./Home";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/form" element={<FormData />} />
        <Route path="/all" element={<EmployeeList />} />
        <Route path="/modify" element={<Modify />} />
      </Routes>

    </Router>
  );
};

export default App;
