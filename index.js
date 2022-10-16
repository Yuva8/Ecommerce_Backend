const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(
  "sk_test_51Lt5jhSIoT8EdXhQLGwV2sso0nDDKWHQ1Ze6x6756x2zfD447Ja5i9obxriEwJGfCCjtHll3gMWI79lodCZMFVNS001Vjqpnhk"
);
require("./connection");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const imageRoutes = require("./routes/imageRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/images", imageRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      description: "Software development services",
      shipping: {
        name: "yuvaraj",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
});
const PORT = process.env.PORT || 4040;
server.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});

app.set("socketio", io);
