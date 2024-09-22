import { users } from "../../sql/sql";
import db from "../../config/db";
import { RequestHandler } from "express";
import { createHash } from "./password";
const checkBody = function (body: any) {
        return body &&
                typeof body.name === "string" &&
                typeof body.email === "string" &&
                typeof body.phone === "string" &&
                typeof body.password === "string";
};
const signUp: RequestHandler = async function (req, res) {
        if (!checkBody(req.body)) {
                return res.status(400).end();
        }
        var a = await createHash(req.body.password), hash = a.hash, salt = a.salt;
        db.none(users.create, { ...req.body, hash: hash, salt: salt }).then(function () {
                res.send(200);
        }).catch(function (e) {
                console.log(e);
                res.status(422).end();
        });
};

export default signUp
