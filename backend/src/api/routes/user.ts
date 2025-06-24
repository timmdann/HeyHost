import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/user';
import middlewares from '../middlewares';
import { IUser } from '../../interfaces/IUser';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  // ✅ Регистрация
  route.post('/register', async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: 'User registered', user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  // ✅ Логин
  route.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email }) as IUser;
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

      return res.json({ token, user });
    } catch (err) {
      return res.status(500).json({ message: 'Login failed', error: err });
    }
  });

  // 🔒 Защищённый профиль
  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.status(200).json({ user: req.currentUser });
  });
};
