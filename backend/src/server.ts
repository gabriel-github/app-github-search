import express, { Request, Response } from "express";
import "dotenv/config";

import axios from "axios";

const api = express();
api.use(express.json());

api.get("/api/callback", (req: Request, res: Response) => {
  const { code } = req.query;

  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };

  const opts = { headers: { accept: "application/json" } };

  axios
    .post("https://github.com/login/oauth/access_token", body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      res.redirect(`http://localhost:3000/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

api.listen("4000", () => console.log("server is running in port 4000"));
