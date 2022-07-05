import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUserRepository, selectUserRepository } from "../repositories/authRepository.js";
import { authService } from "../services/authService.js";

export async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;

        await authService.getUserByemail(email);

        await authService.postUser(name, email, password);
    
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function signIn(req, res) {
    try {
        const { email, password } = req.body;
    
        const { rows } = await selectUserRepository.getUser("email", email);
        const [user] = rows;
    
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return res.sendStatus(401);
        }
    
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET
        );
    
        res.send({
          token,
        });
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}