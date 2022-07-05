import { insertUserRepository, selectUserRepository } from "../repositories/authRepository.js";

async function getUserByemail(email) {
    const existingUsers = await selectUserRepository.getUser("email", email);

    if (existingUsers.rowCount > 0) {
      throw {
          type: "not found",
          message: "user not found"
      }
    }
}

async function postUser(name, email, password) {
    const hashedPassword = bcrypt.hashSync(password, 12);
    
    await insertUserRepository.postUser(name, email, hashedPassword);
}

export const authService = {
    getUserByemail,
    postUser
} 