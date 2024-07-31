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
const ridersRouter = require("./routes/riders");

app.use("/carts",cartRouter)
app.use("/orders",orderRouter)
app.use("/reviews",reviewRouter)
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/restaurants", restaurantRouter);
app.use("/riders" , ridersRouter)
const itemRouter = require("./routes/item");

app.use("/items", itemRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(PORT);
  console.log(`Server listening at http://localhost:${PORT}`);
});