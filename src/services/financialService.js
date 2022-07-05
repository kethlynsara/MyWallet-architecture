import { financialRepository } from "../repositories/financialRepository.js";

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

  await financialRepository.insert(user, value, type);
}

async function getFinancialEvent(user) {
    const events = await financialRepository.select("userId", user);
    return events;
}

async function getFinancialEventSum(user) {
    const events = await financialRepository.select("userId", user);

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
