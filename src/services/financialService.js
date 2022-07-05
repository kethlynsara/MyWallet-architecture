import connection from "../database.js";

async function handleFinancialTypes(user, value, type) {
  if (!value || !type) {
    throw {
        type: "incorrect data",
        message: "Incorrect data!"
    };
  }

  const financialTypes = ["INCOME", "OUTCOME"];
  if (!financialTypes.includes(type)) {
    throw {
        type: "incorrect data",
        message: "Incorrect data!"
    };
  }

  if (value < 0) {
    throw {
        type: "incorrect data",
        message: "Incorrect data!"
    };
  }

  await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [user.id, value, type]
  );
}

async function getFinancialEvent(user) {
    const events = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [user.id]
    );
    return events;
}

async function getFinancialEventSum(user) {
    const events = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [user.id]
      );
  
    const sum = events.rows.reduce(
        (total, event) =>
          event.type === "INCOME" ? total + event.value : total - event.value,
        0
      );

    return sum;
}

export const financialService = {
    handleFinancialTypes,
    getFinancialEvent,
    getFinancialEventSum
}
