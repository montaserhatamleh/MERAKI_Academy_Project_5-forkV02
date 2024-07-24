const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { pool } = require("./models/db");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/users");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const reviewRouter = require("./routes/review");
const roleRouter = require("./routes/roles");
const restaurantRouter = require("./routes/restaurants");
<<<<<<< HEAD
const riderRouter = require("./routes/riders");

=======
const ridersRouter = require("./routes/riders");
>>>>>>> 9e621222da62f8d3c2a06761507ed04be8d8cf60

app.use("/carts",cartRouter)
app.use("/orders",orderRouter)
app.use("/reviews",reviewRouter)
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/restaurants", restaurantRouter);
<<<<<<< HEAD
app.use("/riders", riderRouter);
=======
app.use("/riders" , ridersRouter)
const itemRouter = require("./routes/item");

app.use("/item", itemRouter);
>>>>>>> 9e621222da62f8d3c2a06761507ed04be8d8cf60

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
<<<<<<< HEAD

=======
>>>>>>> 9e621222da62f8d3c2a06761507ed04be8d8cf60
