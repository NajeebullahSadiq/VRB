import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserData from "../Models/UserModel.js";
const UserRouter = express.Router();

UserRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const data = await UserData.find({});
    res.send(data);
  })
);
 export default UserRouter;
