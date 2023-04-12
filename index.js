const os = require("os");
const express = require("express");
const app = express();

const port = 8080;

var hits = 0;

app.listen(port, () => {
  console.log(`Server running on tcp port no. ${port}`);
});

app.get(/.*$/, (req, res, next) => {
  res.json({"hostname": os.hostname(), "url": req.url, "hits": ++hits});
});