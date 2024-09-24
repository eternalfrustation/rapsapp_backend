import { RequestHandler } from "express";
import { profile, users } from "../../sql/sql";
import db from "../../config/db";

const getProfile: RequestHandler = async (req, res) => {
        if (!res.locals.user) {
                return res.status(401).send("Unauthorized")
        }
        db.one(users.findByMail, { email: res.locals.user.email })
		.then((u) => res.send(u))
		.catch((e) => { console.error(e) });
};

export default getProfile;
