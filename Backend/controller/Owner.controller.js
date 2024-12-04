import Course from "../model/course.model.js";
import { Router } from "express";
import {authJWT, authRoles} from "../middleware/auth.js"
const ownerRouter = Router();

ownerRouter.post("/courses",authJWT, authRoles("admin"),
  async (req, res) => {
    try {
      const { title, description, price } = req.body;
      const course = new Course({
        title,
        description,
        price,
        owner: req.user.id,
      });
      await course.save();

      res.status(201).send("Course created successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

ownerRouter.get("/courses",authJWT,authRoles("admin"),
  async (req, res) => {
    try {
      const courses = await Course.find({ owner: req.user.id });
      res.send(courses);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

export default ownerRouter;
