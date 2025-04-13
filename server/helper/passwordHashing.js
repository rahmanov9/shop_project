import bcryptjs from "bcrypt.js"

const hashPassword = async(password) => {
const salt = await bcryptjs.genSalt(10)
const hashedPassword = await bcryptjs.hash(password,salt)
return hashPassword
}

const comparePasswords = async (plainPassword, hashPassword) => {
const isMatch = await bycriptjs.compare(plainPassword,hashPassword)
return isMatch
}

export { hashPassword, comparePasswords }