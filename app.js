const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbconnectivity");
const router = require("./routes/userroutes");
const app = express();
const port = 3000;

dotenv.config();       // Load environment variables
connectDB();           // Connect MongoDB

app.use(express.json());

app.use("/api/users", router);
app.use("/api/users", router);

app.get("/student-read", (req, res) => {
  res.send("Reading");
});

app.post("/student-insert", (req, res) => {
  res.send("Insertion");
});

app.put("/student-update/:id?", (req, res) => {
  res.send("Update");
});

app.delete("/student-delete/:id?", (req, res) => {
  res.send("Deletion");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
