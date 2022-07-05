import { Router } from "express";
import { getFinancialEvent, getFinancialEventSum, postFinancialEvent } from "../controllers/financialController.js";
import { validateToken } from "../middlewares/tokenValidationMiddleware.js";

const financialRouter = Router();

financialRouter.post("/financial-events", validateToken ,postFinancialEvent);
financialRouter.get("/financial-events", validateToken, getFinancialEvent);
financialRouter.get("/financial-events/sum", validateToken, getFinancialEventSum);

export default financialRouter;