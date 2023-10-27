const cors = require("cors");
const express = require("express");

const app = express();
const port = 3000;

app.use(cors());

app.use("/api/data", async (req, res) => {
  try {
    const fetch = await import("node-fetch"); // Use dynamic import instead of require
    const response = await fetch.default(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        // Your original fetch request configuration here
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
