import Course from "../model/course.model.js";
import {authJWT, authRoles} from "../middleware/auth.js"
import { Router } from "express";
import bcrypt from "bcryptjs"
const userRouter = Router();


userRouter.get('/courses', authJWT, authRoles(['user']), async (req, res) => {
  try {
    const courses = await Course.find().populate('owner', 'name email');
    res.send(courses);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

userRouter.post('/buy/:id',  authJWT, authRoles(['user']), async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).send('Course not found');

    if (!user.purchasedCourses) user.purchasedCourses = [];
    if (user.purchasedCourses.includes(course._id)) {
      return res.status(400).send('You have already purchased this course');
    }

    user.purchasedCourses.push(course._id);
    await user.save();
    res.send('Course purchased successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default userRouter;