import { createClient } from "redis";
import { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } from "./keys";

const client = createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
});

(async () => {
  await client.connect();
})();

client.on("connect", () => console.log("Connected to our redis instance!"));

client.on("ready", () =>
  console.log("Client connected to redis and redy to use")
);

client.on("error", (err) => console.log("Redis Client Error due to: ", err));

client.on("end", () => console.log("Client disconnected from redis"));

export default client;
