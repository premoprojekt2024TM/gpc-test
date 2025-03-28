import express from "express";
const app = express();
const port = process.env.PORT || 8080;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
