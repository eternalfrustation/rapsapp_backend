import bcrypt from "bcrypt";
const saltRounds = 5;

const createHash = async (password: string) => {
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password, salt)
        return { salt, hash }
}

const checkHash = async (password: string, salt: string, hash: string) => {
        const new_hash = await bcrypt.hash(password, salt)
        return new_hash == hash
}

export { createHash, checkHash };

