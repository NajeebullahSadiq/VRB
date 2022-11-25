import express from "express";
import expressAsyncHandler from "express-async-handler";
import Data from "../Models/DoctorModel.js";
const doctorRouter = express.Router();

doctorRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const data = await Data.find({});
    res.send(data);
  })
);

doctorRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const data = await Product.findById(req.params.id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
// export default doctorRouter;


export default doctorRouter;
