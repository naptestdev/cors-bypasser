const express = require("express");
const app = express();
const cors = require("cors");
const request = require("request");
require("dotenv/config");

app.use(cors({ origin: true }));

app.use("*", (req, res) => {
  if (req.originalUrl === "/") {
    res.send("Cors Bypasser. Just go to /:url to use the proxy");
  } else {
    try {
      request(req.originalUrl.slice(1), {
        method: req.method,
        headers: req.query.origin
          ? {
              origin: req.query.origin,
              referer: req.query.origin,
              referrer: req.query.origin,
            }
          : {},
        body: req.body,
      }).pipe(res);
    } catch (error) {
      if (!res.headersSent) res.sendStatus(500);
    }
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
