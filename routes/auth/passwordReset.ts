import { sendOtp } from "../../config/email";
import crypto from "crypto";
import db from "../../config/db";
import { users } from "../../sql/sql";
import { createHash } from "./password";
import { RequestHandler } from "express";

const checkRequestBody = function (body: any) {
        return body &&
                typeof body.email === "string";
};
const checkVerificationBody = function (body: any) {
        return body &&
                typeof body.otp === "string" &&
                typeof body.password === "string" &&
                typeof body.email === "string";
};
export const textDecoder = new TextDecoder();
export const requestOTP: RequestHandler = function (req, res) {
        if (!checkRequestBody(req.body)) {
                return res.status(400).end();
        }
        var otp = textDecoder.decode(crypto.randomBytes(6).map(function (b) { return b % 10 + 48; }));
        db.none(users.setOtp, { email: req.body.email, otp: otp }).then(function () {
                console.log("Success");
                res.status(200).end();
        }).catch(function (e) {
                console.error(e);
                res.status(422).end();
        });
        sendOtp(otp, req.body.email);
        res.status(200).end();
};
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


