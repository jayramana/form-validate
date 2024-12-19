import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <button onClick={() => Navigate("/all")}>Employee List</button>
      <button onClick={() => Navigate("/form")}>Add Employee</button>
    </div>
  );
};

export default Home;
