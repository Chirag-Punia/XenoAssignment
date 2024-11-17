const redis = require("redis");

const redisPublisher = redis.createClient({
  url: process.env.REDIS_URL || "redis://red-cssj7mt2ng1s73alu7s0:6379",
});

redisPublisher.on("error", (err) =>
  console.error("Redis Publisher Error:", err)
);

(async () => {
  try {
    await redisPublisher.connect();
    console.log("Redis Publisher connected successfully");
  } catch (error) {
    console.error("Failed to connect Redis Publisher:", error.message);
  }
})();

const publishMessage = async (channel, message) => {
  try {
    console.log(`Publishing message to channel: ${channel}`);
    await redisPublisher.publish(channel, JSON.stringify(message));
    return { success: true };
  } catch (error) {
    console.error("Error publishing message:", error.message);
    return { success: false };
  }
};

module.exports = { publishMessage };
