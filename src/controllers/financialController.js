
import { financialService } from "../services/financialService.js";


export async function postFinancialEvent(req, res) {
    const { user } = res.locals;
    const { value, type } = req.body;
    
    try {        
        await financialService.handleFinancialTypes(user, value, type);    
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
     }
}

export async function getFinancialEvent(req, res) {
    const { user } = res.locals;
    try {
        const events = await financialService.getFinancialEvent(user);    
        res.send(events);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function getFinancialEventSum(req, res) {
    const { user } = res.locals;
    try {
        const sum = financialService.getFinancialEventSum(user);
    
        res.send({ sum });
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}