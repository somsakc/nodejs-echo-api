const os = require("os");
const express = require("express");
const app = express();
app.use(express.json());

const port = 8080;

var hits = 0;
var version = process.env.VERSION || "1.0.0";
var verbose_request = process.env.VERBOSE_REQUESTS || "true";

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

app.all('*', (req, res) => {
  let out = {"hostname": os.hostname(), "version": version, "url": req.url, "method": req.method, "hits": ++hits};

  if ( verbose_request === "true" ) {
    out["request"] = {
      method: req.method,
      url: req.url,
      path: req.path,
      originalUrl: req.originalUrl,
      headers: { ...req.headers },
      body: req.body && Object.keys(req.body).length > 0 ? req.body : undefined,
      query: req.query,
      params: req.params,
      ip: req.ip,
      protocol: req.protocol,
      secure: req.secure,
      host: req.get('host'),
      hostname: req.hostname
    };
  }
  console.log(JSON.stringify(out));
  res.json(out);
});