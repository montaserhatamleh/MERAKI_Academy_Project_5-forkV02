const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {pool} = require("./models/db");

const app = express();
const PORT = process.env.PORT;



app.use(cors());
app.use(express.json());



//Routers
const userRouter = require("./routes/users")
const roleRouter = require("./routes/roles")



app.use("/users",userRouter)
app.use("/roles",roleRouter)



// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
