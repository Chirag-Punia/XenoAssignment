const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const setupRedisSubscriber = require("./config/RedisSubscriber");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
mongoose.set("strictQuery", true);
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "CRM" });
    console.log("MongoDB connected");

    await setupRedisSubscriber();
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

app.use("/auth", require("./routes/authRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/campaigns", require("./routes/campaignRoutes"));
app.use("/customers", require("./routes/customerRoutes"));
app.use("/aud", require("./routes/audienceRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
