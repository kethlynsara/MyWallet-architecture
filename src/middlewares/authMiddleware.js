export async function checkSignUpData(req, res, next) {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.sendStatus(422);
    }

    next();
}

export async function checkSignInData(req, res, next) {
    const { email, password } = req.body;
    
     if (!email || !password) {
        return res.sendStatus(422);
    }

    next();
}