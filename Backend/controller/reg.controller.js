import bcrypt from 'bcryptjs'
import User from '../model/user.model.js';
import { Router } from "express";
import jwt from "jsonwebtoken"
const regRouter = Router();



regRouter.post('/signup', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      if (!['admin', 'owner', 'user'].includes(role)) {
        return res.status(400).send('Invalid role');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ name, email, password: hashedPassword, role });
      await user.save();
  
      res.status(201).json('User registered successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
});

regRouter.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json('User not found');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send('Invalid credentials');
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.json({ token });
    } catch (err) {
      res.status(500).send(err.message);
    }
});
export default regRouter;