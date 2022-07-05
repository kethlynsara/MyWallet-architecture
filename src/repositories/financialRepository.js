import connection from "../database.js";

async function select(columnName, info) {
    return connection.query(`SELECT * FROM users WHERE "${columnName}" = $1 ORDER BY "id" DESC`, [info]);
}

async function insert(user, value, type) {
    return connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [user.id, value, type]
      );
}

export const financialRepository = {
    select,
    insert
}