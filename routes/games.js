//games.js
"use strict";
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const cookieParser = require("cookie-parser");
const session = require("express-session");

function render(req, res, view, data = {}, locate = "") {
  const qE = req.query.e || "";
  if (view == "error" && qE) {
    console.log(`redirect by 404 to /error?e=${qE}`);
  }
  const name = locate ? `${locate}/${view}` : view;
  res.render(name, { ...data, em: "false" }, (err, html) => {
    if (err) {
      console.log(`404 at /${name} in render function`);
      res.status(404).render("error", {
        title: "404 Not Found",
        page: "error",
        ec: name,
        em: "false",
      });
    } else {
      console.log(`access to /${name} ... OK`);
      res.send(html);
    }
  });
}

router.get(["/"], (req, res) => {
  render(req, res, "games", {
    title: "_tonkatsu_のページ",
    page: "games",
    top: "ゲームをプレイ",
  });
});

router.get(["/:id", "/:id.html"], (req, res) => {
  let gameId = req.params.id;
  gameId = gameId.replace(/\.(html|ejs)$/, "");
  render(req, res, gameId, {}, "games");
});

module.exports = router;