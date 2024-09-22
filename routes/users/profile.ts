import { RequestHandler } from "express";
import { profile, users } from "../../sql/sql";
import db from "../../config/db";

const checkBody = (body: any) =>
        body &&
        body.adhaar &&
        body.city &&
        body.district &&
        body.pin_code &&
        body.town &&
        body.account_number &&
        body.branch &&
        body.ifsc;

const createProfile: RequestHandler = async (req, res) => {
        if (!res.locals.user) {
                return res.status(401).send("Unauthorized")
        }

        if (!checkBody(req.body)) {
                return res.status(400).end()
        }
        const user_id = await db.one(users.findByMail, { email: res.locals.user.email }).then((u) => u.id).catch(console.error);
        if (!user_id) {
                return res.status(400).end();
        }
        db.none(profile.create, {
                user_id: user_id,
                email: res.locals.user.email,
                adhaar: req.body.adhaar,
                city: req.body.city,
                district: req.body.district,
                pin_code: Number(req.body.pin_code),
                town: req.body.town,
                account_number: req.body.account_number,
                branch: req.body.branch,
                ifsc: req.body.ifsc,
        }).then(() => {
                res.end();
        }).catch((e) => {
                console.error(e);
                res.status(500).end();
        })

};

const getProfile: RequestHandler = async (req, res) => {
        if (!res.locals.user) {
                return res.status(401).send("Unauthorized")
        }
        const user_id = await db.one(users.findByMail, { email: res.locals.user.email }).then((u) => u && u.id).catch(() => { });
        if (!user_id) {
                return res.status(400).end();
        }
        db.one(profile.get, {
                user_id: user_id,
        }).then((d) => {
                res.send(d)
        }).catch((e) => {
                console.error(e);
                res.status(500).end();
        })
};

export { createProfile, getProfile };
