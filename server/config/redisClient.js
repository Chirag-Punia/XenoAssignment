const redis = require("redis");

const redisClient = redis.createClient({
  url:   "redis://red-cssj7mt2ng1s73alu7s0:6379" || process.env.REDIS_URL,
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
