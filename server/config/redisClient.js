const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://red-cssj7mt2ng1s73alu7s0:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis Client connected successfully");
  }
};

module.exports = { redisClient, connectRedis };
