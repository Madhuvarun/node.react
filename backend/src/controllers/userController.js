const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const db = require("../database")
const createUser = async (req, res) => {
    
    const name = req.body?.name
    const email = req.body?.email
    const password = req.body?.password
    const cpassword = req.body?.cpassword
    
    if (!name || name === "")
        return res.json({"message": "name field is required"})
    if (!email || email === "")
        return res.json({"message": "password field is required"})
    if (!password || password === "")
        return res.json({"message": "password field is required"})
    if (!cpassword || cpassword === "")
        return res.json({"message": "confirm password field is required"})
    if (password !== cpassword)
        return res.json({"message": "passwords do not match"})

    const hashedPassword = await argon2.hash(password)

    try {
        const result = await db.query("call amazon.createuser($1, $2, $3, $4)", [name, email, hashedPassword, null])
        res.json({"message": "User created successfully"})
    }
    catch (err) {
        res.json({"message": "Something went wrong. Please try again later"})
    }
}

const loginUser = async (req, res) => {
    const email = req.body?.email
    const password = req.body?.password

    try {
        const result = await db.query("SELECT email, password FROM amazon.users WHERE email = $1", [email])
        if (result.rowCount !== 1) 
            res.status(401).json({"message": "Wrong credentials"})
        else {
            const hashedPassword = result.rows[0]['password']
            const isPasswordCorrect = await argon2.verify(hashedPassword, password)
            if (!isPasswordCorrect)
                res.json({"message": "Wrong credentials"})
            else {
                const payload = {email: email}
                const options = {expiresIn: '24h'}
                const token = jwt.sign(payload, process.env.SERVER_SECRET_KEY, options)
                res.json({"message": "Login successful", "token": token})
            }
        }
    }
    catch (err) {
        res.json({"message": "Something went wrong. Please try again later"})
    }
}

module.exports = {
    createUser,
    loginUser
}