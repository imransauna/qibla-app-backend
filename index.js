const express = require("express");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
require("./supertokens-config");

const app = express();

// SuperTokens middleware
app.use(middleware());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Qibla App Backend is running! By girijesh",
    timestamp: new Date().toISOString()
  });
});

// Basic API endpoint for testing
app.get("/api/qibla", (req, res) => {
  res.json({ 
    message: "Qibla direction endpoint - to be implemented by developer" 
  });
});

app.use(errorHandler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Qibla App API listening on port ${PORT}`);
});
