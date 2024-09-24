import { RequestHandler } from "express";
import { Storage } from "@google-cloud/storage";
import { profile, service, users } from "../../sql/sql";
import db from "../../config/db";

const storage = new Storage();

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

const checkServiceBody = (body: any) =>
        body &&
        body.name &&
        body.rate;

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

const setProfilePhoto: RequestHandler = async (req, res) => {

        if (!res.locals.user) {
                return res.status(401).send("Unauthorized")
        }
        if (!req.is("application/octet-stream")) {
                return res.status(415).end();
        }
        const user_id = await db.one(users.findByMail, { email: res.locals.user.email }).then((u) => u && u.id).catch(() => { });
        if (!user_id) {
                return res.status(400).end();
        }
        const fileRef = storage.bucket("rapsapp_user_images").file(user_id)
        req.pipe(fileRef.createWriteStream())
}

const getProfilePhoto: RequestHandler = async (req, res) => {
        if (!res.locals.user) {
                return res.status(401).send("Unauthorized")
        }
        const user_id = await db.one(users.findByMail, { email: res.locals.user.email }).then((u) => u && u.id).catch(() => { });
        if (!user_id) {
                return res.status(400).end();
        }
        const fileRef = storage.bucket("rapsapp_user_images").file(user_id)
        res.header("Content-Type", "application/octet-stream")
        fileRef.createReadStream().pipe(res)
}

const addService: RequestHandler = async (req, res) => {
        if (!checkServiceBody(req.body)) {
                return res.status(400).end()
        }
        if (!res.locals.user) {
                return res.status(401).send("Unauthorized")
        }
        const user_id = await db.one(users.findByMail, { email: res.locals.user.email }).then((u) => u && u.id).catch((e) => { console.error(e) });
        if (!user_id) {
                return res.status(400).end();
        }
        await db.none(service.create, { user_id: user_id, name: req.body.name, rate: req.body.rate }).then(() => {
                res.status(200).end()
        }).catch((e) => {
                console.error(e);
                res.status(400).end()
        })
}

const getServices: RequestHandler = async (req, res) => {
        if (!checkServiceBody(req.body)) {
                return res.status(400).end()
        }
        if (!res.locals.user) {
                return res.status(401).send("Unauthorized")
        }
        const user_id = await db.one(users.findByMail, { email: res.locals.user.email }).then((u) => u && u.id).catch((e) => { console.error(e) });
        if (!user_id) {
                return res.status(400).end();
        }
        await db.manyOrNone(service.get, { user_id: user_id }).then((d) => {
                res.status(200).send(d)
        }).catch((e) => {
                console.error(e);
                res.status(400).end()
        })
}



export { createProfile, getProfile, setProfilePhoto, getProfilePhoto , addService, getServices};
