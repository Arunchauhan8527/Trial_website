const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tiger@245208", // your password here
  database: "arun" // replace t his
});

app.post("/insert", (req, res) => {
  const { name, email, phone, messege } = req.body;
  const sql = "INSERT INTO users (name, email, phone, messege) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, messege], (err, result) => {
    if (err) {
         if (err.code === "ER_DUP_ENTRY") {
        // Duplicate phone number
        return res.status(400).json({ messege: "Phone number already exists." });
      }
      console.error("Error:", err);
      return res.status(500).json({ messege: "Submission Failed" });
    }
    res.json({ messege: "Detail Submitted" });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
