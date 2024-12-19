const express = require("express");
const routes = require("./routes/routes.js");
const db = require("./db/db.js"); 
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
