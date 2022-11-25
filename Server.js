process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
import dotenv from "dotenv";
import fetch from "node-fetch";
import express from "express";
const app = express();

import logger from "morgan"
import cors from "cors";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

import doctorRouter from "./Routers/DoctorRouter.js";
import mongoose from "mongoose";
import UserRouter from "./Routers/UserRouter.js";


// connect database
const mongoDB =
  "mongodb+srv://najib:Khan@cluster0.zms67.mongodb.net/VirtualDoctor?retryWrites=true&w=majority";  //"mongodb://127.0.0.1/VirtualDoctor"; 
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/doctorData", doctorRouter);
app.use("/userData", UserRouter);

console.log(mongoose.connection.readyState);






// implementation of video call
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

