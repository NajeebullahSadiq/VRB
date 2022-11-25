process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

import dotenv from "dotenv";
import fetch from "node-fetch";
import logger from "morgan";
app.use(logger("dev"));
//for Video streaming support

import doctorRouter from "./Routers/DoctorRouter.js";
import mongoose from "mongoose";
import UserRouter from "./Routers/UserRouter.js";

// connect database
const mongoDB = MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/doctorData", doctorRouter);
app.use("/userData", UserRouter);

console.log(mongoose.connection.readyState);


//implements Video calls

const API_KEY = process.env.daily_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

const getRoom = (room) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

const createRoom = (room) => {
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("error:" + err));
};

app.get("/video-call/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});


//end of implements of Video calls


const port = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send(`Server is running ${port}`);
});
app.listen(port, () => console.log(`Server Running on port ${port}`));

