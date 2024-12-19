const express = require("express");
const db = require("../db/db");
const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM FORMDATA";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ message: "Error fetching data", error: err.message });
    }
    res.status(200).json(results);
  });
});

router.post("/submit", async (req, res) => {
  const {
    empid,
    firstname,
    lastname,
    email,
    department,
    role,
    password,
    phoneno,
    dob,
  } = req.body;
  const checkEmpidExists = (empid) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM FORMDATA WHERE empid = ?";
      db.query(query, [empid], (err, result) => {
        if (err) return reject(new Error("Error checking if employee ID exists"));
        if (result.length > 0) return reject(new Error("Employee ID already exists"));
        resolve();
      });
    });
  };

  const firstValidate = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (firstname.length < 3) {
      throw new Error("First name must be at least 3 characters long");
    }
    if (!nameRegex.test(firstname)) {
      throw new Error("First name must contain only alphabets");
    }
  };

  const lastValidate = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (lastname.length < 1) {
      throw new Error("Last name must be at least 1 character long");
    }
    if (!nameRegex.test(lastname)) {
      throw new Error("Last name must contain only alphabets");
    }
  };

  const emailValidate = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM FORMDATA WHERE email = ?";
      db.query(query, [email], (err, result) => {
        if (err) return reject(new Error("Error checking if email exists"));
        if (result.length > 0) return reject(new Error("Email already exists"));
        resolve();
      });
    });
  };

  const allowedDepartments = [
    "Sales",
    "Marketing",
    "Engineering",
    "HR",
    "R&D",
    "Production",
    "Customer Service",
  ];

  const departmentValidate = () => {
    if (!allowedDepartments.includes(department)) {
      throw new Error("Invalid department");
    }
  };

  const roles = [
    "Director",
    "Employee Relations",
    "HR Manager",
    "Training Manager",
    "Engineering Manager",
    "Software Engineer",
    "Security Engineer",
    "R&D Engineer",
    "Quality Control (QC) Engineer",
    "Project Engineer",
    "Marketing Manager",
    "Content Marketing Manager",
    "Social Media Manager",
    "Email Marketing Manager",
    "R&D Manager",
    "Research Scientist",
    "Product Development Engineer",
    "R&D Analyst",
    "Innovation Specialist",
    "Production Planner",
    "Process Improvement Specialist",
    "Manufacturing Engineer",
    "Customer Service Manager",
    "Technical Support Specialist",
    "Call Center Agent",
  ];

  const roleValidate = () => {
    const roleRegex = /^[a-zA-Z0-9\s]+$/;
    if (!roleRegex.test(role) || !roles.includes(role)) {
      throw new Error("Invalid role");
    }
  };

  const passwordValidate = () => {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passRegex.test(password)) {
      throw new Error(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and must be 6-20 characters long"
      );
    }
  };

  const phoneValidate = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneno)) {
      throw new Error("Invalid phone number");
    }
  };


  try {
    await checkEmpidExists(empid);
    firstValidate();
    lastValidate();
    await emailValidate(email);
    departmentValidate();
    roleValidate();
    passwordValidate();
    phoneValidate();
  } catch (err) {
    console.error("Validation error:", err.message);
    return res.status(400).json({ message: "Validation failed", error: err.message });
  }

  const query = `
    INSERT INTO FORMDATA (empid, firstname, lastname, email, department, role, password, phoneno, dob)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [empid, firstname, lastname, email, department, role, password, phoneno, dob],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.message);
        return res.status(500).json({ message: "Error inserting data", error: err.message });
      }
      console.log("Data inserted successfully:", result);
      return res.status(200).json({ message: "Data inserted successfully" });
    }
  );
});

router.put("/:empid", (req, res) => {
  const { empid } = req.params;
  const { firstname, lastname, email, department, role, password, phoneno, dob } = req.body;

  const query = `
    UPDATE FORMDATA 
    SET firstname = ?, lastname = ?, email = ?, department = ?, role = ?, password = ?, phoneno = ?, dob = ? 
    WHERE empid = ?
  `;

  db.query(
    query,
    [firstname, lastname, email, department, role, password, phoneno, dob, empid],
    (err, result) => {
      if (err) {
        console.error("Error updating data:", err.message);
        return res.status(500).json({ message: "Error updating data", error: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Employee ID not found" });
      }
      console.log("Data updated successfully:", result);
      res.status(200).json({ message: "Data updated successfully" });
    }
  );
});

router.delete("/d/:empid", (req, res) => {
  const { empid } = req.params;

  const query = "DELETE FROM FORMDATA WHERE empid = ?";

  db.query(query, [empid], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err.message);
      return res.status(500).json({ message: "Error deleting data", error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee ID not found" });
    }
    console.log("Data deleted successfully:", result);
    res.status(200).json({ message: "Data deleted successfully" });
  });
});

router.delete("/dall", (req, res) => {
  const query = "DELETE FROM FORMDATA";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error deleting all data:", err.message);
      return res.status(500).json({ message: "Error deleting all data", error: err.message });
    }
    console.log("All data deleted successfully:", result);
    res.status(200).json({ message: "All data deleted successfully" });
  });
});

module.exports = router;
