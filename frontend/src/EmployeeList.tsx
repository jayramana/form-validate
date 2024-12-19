import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useIDContext } from "./hooks/IdProvider";

const EmployeeList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [id,setID] = useState("")
  const {setIDValue} = useIDContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/");
        setUsers(res.data);
      } catch (err) {
        console.log("Error Fetching Data", err.message);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="p-4">
      <p>Total Employees : {users.length}</p>
      <main className="grid grid-cols-5 gap-4 p-4">
        {users.map((user, index) => (
          <div key={index} className="border-x-2 border-y-2 ">
            <div className="flex justify-between">
              <div className="flex">
                <p>Name :</p>
                <div className="flex gap-1">
                  <p className=""> {user.firstname}</p>
                  <p>{user.lastname}</p>
                </div>
              </div>
              <div>
                <BiPencil
                  onClick={() => {
                    navigate("/modify");
                    setIDValue(user.empid);
                  }}
                />
              </div>
            </div>
            <p>Email : {user.email}</p>
            <p>Date Of Joining : {formatDate(user.dob)}</p>
            <p>Role : {user.role}</p>
            <p>Department : {user.department}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default EmployeeList;
