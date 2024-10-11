const WebSocket = require('ws');
const express = require('express');
const app = express();

const port = process.env.PORT || 3001; // Use PORT env variable, default to 3001 for local development
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on ws://localhost:${port}`);
