import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import transactionRoutes from "./routes/transactions.js";
import subscriptionRoutes from "./routes/subscriptions.js";
import apiKeyRoutes from "./routes/api-keys.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use("/api/transactions", transactionRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/api-keys", apiKeyRoutes);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("transaction", (data) => {
    io.emit("transaction", data);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});