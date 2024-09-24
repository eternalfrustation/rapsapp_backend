import { RequestHandler } from "express";
import { sendOtp } from "../../config/email";
import crypto from "crypto";
import { textDecoder } from "./passwordReset";
import db from "../../config/db";
import { users } from "../../sql/sql";

const checkRequestBody = function (body: any) {
        return body &&
                typeof body.email === "string";
};

const checkOTPReq = (body: any) => {
        return body &&
                typeof body.email === "string" &&
                typeof body.otp === "string";

}

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

export const verifyOTP: RequestHandler = async function (req, res) {
        if (!checkOTPReq(req.body)) {
                return res.status(400).end();
        }
        await db.one(users.checkOtp, { email: req.body.email, otp: req.body.otp }).then((d) => {
                if (d == "OK") {
                        res.status(200).end()
                } else {
                        res.status(400).end()
                }
        }).catch((e) => { console.error(e); res.status(e).end() });
}
