import { users } from "../../sql/sql";
import db from "../../config/db";
import { checkHash } from "./password";
import { createToken } from "../../config/jwt";
import { RequestHandler } from "express";
import { textDecoder } from "./passwordReset";

var checkBody = function (body: any) {
        return body &&
                typeof body.email === "string" &&
                typeof body.password === "string";
};


const signIn: RequestHandler = function (req, res) {
        if (!checkBody(req.body)) {
                return res.status(400).end();
        }
        db.one(users.getHash, { email: req.body.email }).then(async function (a) {
                var password = a.password, salt = a.salt;
                if (await checkHash(req.body.password, textDecoder.decode(salt), password)) {
                        res.cookie("auth-token", createToken({ email: req.body.email, hash: password })).send(200);
                }
                else {
                        res.send(401);
                }
        }).catch(function (e) {
                console.log(e)
                res.send(401);
        });
};

export default signIn;
