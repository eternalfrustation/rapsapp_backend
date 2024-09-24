import { QueryFile } from 'pg-promise';
import { join as joinPath } from 'path';
import db from '../config/db';

// Helper for linking to external query files:
function sql(file: string) {
        const fullPath = joinPath(__dirname, file); // generating full path;
        return new QueryFile(fullPath, { minify: true });
}

db.none(sql("init/users.sql"))
db.none(sql("init/profile.sql"))

// external queries for Users:
export const users = {
        create: sql('users/create.sql'),
        findByMail: sql('users/findByMail.sql'),
        getHash: sql('users/getHash.sql'),
        setOtp: sql('users/setOtp.sql'),
        resetPassword: sql('users/resetPassword.sql'),
	checkOtp: sql('users/checkOtp.sql')
}

export const profile = {
        create: sql('profile/createProfile.sql'),
	get: sql('profile/getProfile.sql')
}

export const service = {
	create: sql('service/create.sql'),
	get: sql('service/get.sql'),
}
