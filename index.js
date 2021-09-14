const express = require("express");
const app = express();
const cors = require("cors");
const request = require("request");
require("dotenv/config");

app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  if (!req.query.url) res.send("Cors bypasser. Query parameter url is required");

  try {
    request
      .get(req.query.url, {
        headers: req.query.origin
          ? {
              origin: req.query.origin,
              referer: req.query.origin,
              referrer: req.query.origin,
            }
          : {},
      })
      .pipe(res);
  } catch (error) {
    console.log(error);
    if (!res.headersSent) res.sendStatus(500);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
