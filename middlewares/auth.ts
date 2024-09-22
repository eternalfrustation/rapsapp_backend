import { decodeToken } from "../config/jwt";
import db from "../config/db";
import { users } from "../sql/sql";
import { RequestHandler } from "express";

const auth: RequestHandler = (req, res, next) => {
        const tokenData = req.cookies["auth-token"];
        if (!tokenData) {
                return res.status(401).send("Unauthorized")
        }
        const token = decodeToken(tokenData);
        if (typeof token == "string") {
                return res.status(401).send("Unauthorized")
        }
        db.one(users.getHash, { email: token.email }).then(() => {
                res.locals.user = token;
                next()
        }).catch(() => {
                res.status(401).send("Unauthorized")
        })
}

export default auth;
