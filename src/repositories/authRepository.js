import connection from "../database.js";

async function getUser(columnName, info) {
    return connection.query(`SELECT * FROM users WHERE "${columnName}" = $1`, [info]);
}

export const selectUserRepository = {
    getUser
}

async function postUser(name, email, hashedPassword) {
    return connection.query(`INSERT INTO users (name, email, password)
                     VALUES ($1, $2, $3)`, [name, email, hashedPassword]);
}

export const insertUserRepository = {
    postUser
}