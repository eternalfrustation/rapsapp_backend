import crypto from "crypto";
import pgp from 'pg-promise';
import db from "../../config/db";
import { users } from "../../sql/sql";
import { createToken } from "../../config/jwt";
import { createHash } from "./password";
import { RequestHandler } from "express";

const callback: RequestHandler = (req, res) => {
        if (typeof req.body.credential != 'string') {
                return res.status(400).end();
        }
        var userInfo = fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: {
                        "Authorization": "Bearer ".concat(req.body.credential)
                }
        }).then(function (d) { return d.json(); }).catch(function (e) { console.error(e); res.status(400).end(); });
        userInfo.then(function (u) {
                db.one(users.findByMail, { email: u.email }).then(function (d) {
                        res.cookie("auth-token", createToken({ email: d.email, hash: d.password })).status(401).end();
                }).catch(async function (e) {
                        console.error(e);
                        var pwd = crypto.randomBytes(20).toString('base64');
                        if (e.code === pgp.errors.queryResultErrorCode.noData) {
                                var a = await createHash(pwd), hash = a.hash, salt = a.salt;
                                db.none(users.create, {
                                        hash: hash,
                                        salt: salt,
                                        email: u.email,
                                        name: u.name
                                })
                                        .then(function () {
                                                res.send(200);
                                        }).catch(function (e) {
                                                res.status(422).send(e);
                                        });
                        }
                });
        }).catch(function (e) {
                console.error(e);
                res.status(401).end();
        });
};

export default callback;
