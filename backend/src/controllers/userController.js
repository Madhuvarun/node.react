const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { db } = require("../database");

const userSignUp = async (req, res) => {
  const name = req.body?.name;
  const email = req.body?.email;
  const password = req.body?.password;
  const cpassword = req.body?.cpassword;

  if (name === "" || !name)
    return res.json({ message: "name field is required" });
  if (email === "" || !email)
    return res.json({ message: "email field is required" });
  if (password === "" || !password)
    return res.json({ message: "password field is required" });
  if (cpassword === "" || !cpassword)
    return res.json({ message: "cpassword field is required" });
  if (password !== cpassword)
    return res.json({ message: "passwords don't match" });

  const hashedPassword = await argon2.hash(password);

  try {
    await db.query("CALL amazon.create_user($1, $2, $3, $4)", [
      name,
      email,
      hashedPassword,
      null,
    ]);
  } catch (err) {
    if (err.code === "45000")
      return res.json({ message: "Email already exists" });
    return res.json({
      message: "Something went wrong. Please try again later",
    });
  }

  return res.json({ message: "User registered successfully" });
};

const userSignIn = async (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;
  let result;
  try {
    result = await db.query(
      "SELECT email, password FROM amazon.users WHERE email = $1",
      [email]
    );
  } catch (err) {
    return res.json({
      message: "Something went wrong. Please try again later",
    });
  }

  if (result.rowCount == 1) {
    const dbPassword = result.rows[0].password;
    const passowrdIsSame = await argon2.verify(dbPassword, password);

    if (passowrdIsSame) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.cookie("user_session", token);
      return res.json({ message: "User logged in" });
    }
  }

  return res.json({ message: "Invalid credentials" });
};

const userController = {
  userSignUp,
  userSignIn,
};

module.exports = userController;
