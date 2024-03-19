const express = require("express");
const app = express();
const tweetRoutes = require("./src/routes/tweetRoutes");

app.use(express.json());

// Use tweetRoutes
app.use("/tweets", tweetRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});