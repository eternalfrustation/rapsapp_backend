import db from "../../config/db";
import { users } from "../../sql/sql";
import { createHash } from "./password";
import { RequestHandler } from "express";

const checkVerificationBody = function (body: any) {
        return body &&
                typeof body.otp === "string" &&
                typeof body.password === "string" &&
                typeof body.email === "string";
};
export const textDecoder = new TextDecoder();
export const resetPassword: RequestHandler = async function (req, res) {
        if (!checkVerificationBody(req.body)) {
                return res.status(400).end();
        }
        var a = await createHash(req.body.password), hash = a.hash, salt = a.salt;
        db.none(users.resetPassword, { email: req.body.email, otp: req.body.otp, salt: salt, password: hash }).then(function () { res.status(200).send(); }).catch(function (e) {
                console.error(e);
                res.status(401).send();
        });
};


