const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;