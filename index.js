const os = require("os");
const express = require("express");
const app = express();

const port = 8080;

var hits = 0;
var version = process.env.VERSION || "1.0";

app.listen(port, () => {
  console.log(`Server running on tcp port no. ${port}`);
  console.log(`version is set to ${version}`);
});

app.get('/health', (req, res, next) => {
  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.send('OK');
});

app.get('/metrics', (req, res, next) => {
  let hostname = os.hostname();
  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.send(`nodejs_echo_api{hostname="${hostname}",version="${version}",url="${req.url}"} ${hits}`);
});

app.get(/.*$/, (req, res, next) => {
  let out = {"hostname": os.hostname(), "version": version, "url": req.url, "hits": ++hits};
  console.log(JSON.stringify(out));
  res.json(out);
});