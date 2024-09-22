import jwt from "jsonwebtoken"
import process from "process"

const SECRET_KEY = process.env.JWT_SECRET_KEY

export const createToken = (data: any) => jwt.sign(data, SECRET_KEY ?? "aklsdjhfsjkldhdsfs", {expiresIn: 86400})
export const decodeToken = (token: string) => jwt.verify(token, SECRET_KEY ?? "aklsdjhfsjkldhdsfs")

