import React, { useEffect, useState } from "react";
import axios from "axios";
import { useIDContext } from "./hooks/IdProvider";
const Modify = () => {
  const [users, setUsers] = useState([]);

  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [roles, setRoles] = useState("");
  const [dob, setDob] = useState("");
  const [id, setId] = useState("");
  const [errors, setError] = useState("");
  const [iddupli, setIddupli] = useState([]);

  const [idError, setIdError] = useState("");
  const [fnError, setFnerror] = useState("");
  const [lnError, setLnerror] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");

  const { idValue } = useIDContext();
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/");
        setUsers(res.data);
      } catch (err) {
        setError(err.message || "An unknown Error Occured");
      }
    };
    getAllUsers();
  }, [users]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log({
        idValue, 
        firstname,
        lastName,
        email,
        mobile,
        password,
        department,
        roles,
        dob,
      });
      const res = await axios.put(`http://localhost:3000/api/${idValue}`, {
        empid: idValue,
        firstname: firstname,
        lastname: lastName,
        email: email,
        phoneno: mobile,
        password: password,
        department: department,
        role: roles,
        dob: dob,
      });
      console.log("API Response:", res.data);  // Log the response from the API
      setUsers((prevUsers : any) =>
        prevUsers.map((user : any) =>
          user.empid === idValue ? { ...user, ...res.data } : user
        )
      );  // Update the user list with the updated user data
      setMessage("Data Successfully Modified");
    } catch (err) {
      console.error("Error response:", err.response || err); // Log error response from backend
      setError(err.message || "An unknown Error Occured");
      setMessage(err.message);
    }
  };
  

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setDepartment("");
    setRoles("");
    setDob("");
    setId("");
  };

  const firstNameValidate = (name: string) => {
    if (name.length < 3) {
      setFnerror("First Name should be atleast 3 characters long");
    } else {
      setFnerror("");
    }
  };
  const IDValidate = (id: string) => {
    if (iddupli.includes(id)) {
      setIdError("Employee ID already exists");
    } else {
      setIdError("");
    }
  };
  const lastNameValidate = (name: string) => {
    if (name.length < 1) {
      setLnerror("Last Name should not be Empty");
    } else {
      setLnerror("");
    }
  };

  const emailValidate = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid Email");
    } else {
      setEmailError("");
    }
  };

  const mobileValidate = (mobile: string) => {
    if (mobile.length !== 10) {
      setMobileError("Mobile Number should be 10 digits long");
    } else {
      setMobileError("");
    }
  };

  const passwordValidate = (password: string) => {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passRegex.test(password)) {
      setPasswordError(
        "Password should contain atleast 1 uppercase, 1 lowercase and 1 digit"
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="flex flex-col items-left justify-left gap-4 bg-black text-white p-4 rounded-sm"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            name="fname"
            className="border-2 border-solid text-black"
            id="fname"
            onChange={(e) => {
              setFirstName(e.target.value);
              firstNameValidate(e.target.value);
            }}
          />
          <p>{fnError ? <span className="text-red-600">{fnError}</span> : null}</p>
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            name="lname"
            className="border-2 border-solid text-black"
            id="lname"
            onChange={(e) => {
              setLastName(e.target.value);
              lastNameValidate(e.target.value);
            }}
          />
          <p className="text-red-600">{lnError ? <p>{lnError}</p> : null}</p>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="border-2 border-solid text-black"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
              emailValidate(e.target.value);
            }}
          />
          <p className="text-red-600">
            {emailError ? <p>{emailError}</p> : null}
          </p>
        </div>
        <div>
          <label htmlFor="mobile">Phone Number:</label>
          <input
            type="tel"
            name="mobile"
            className="border-2 border-solid text-black"
            id="mobile"
            onChange={(e) => {
              setMobile(e.target.value);
              mobileValidate(e.target.value);
            }}
          />
          <p className="text-red-600">
            {mobileError ? <p>{mobileError}</p> : null}
          </p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="border-2 border-solid text-black"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              passwordValidate(e.target.value);
            }}
          />
          <p className="text-red-600">
            {passwordError ? <p>{passwordError}</p> : null}
          </p>
        </div>
        <div>
          <label htmlFor="dept">Department:</label>
          <select
            name="department"
            id="dept"
            className="border-2 border-solid text-black"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Production">Production</option>
            <option value="Engineering">Engineering</option>
            <option value="Customer Service">Customer Service</option>
            <option value="R&D">R&D</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label htmlFor="role">Roles:</label>
          <select
            name="role"
            id="role"
            className="border-2 border-solid text-black"
            onChange={(e) => setRoles(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Security Engineer">Security Engineer</option>
            <option value="Engineering Manager">Engineering Manager</option>
            <option value="R&D Manager">R&D Manager</option>
          </select>
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            aria-current="date"
            name="dob"
            className="border-2 border-solid text-black"
            id="dob"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        <button
          type="reset"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </form>
      <div className="self-center">
        {message ? (
          <p className={errors ? "text-red-500" : "text-green-500"}>
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Modify;
