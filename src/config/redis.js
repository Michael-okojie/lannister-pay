import { createClient } from "redis";
import { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } from "./keys";

const client = createClient(REDIS_PORT, REDIS_HOST, {
  auth_pass: REDIS_PASSWORD,
});

(async () => {
  await client.connect();
})();

client.on("connect", () => console.log("Connected to our redis instance!"));
client.on("error", (err) => console.log("Redis Client Error due to: ", err));

export default client;
