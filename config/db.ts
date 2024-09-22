import pgp from 'pg-promise'
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
import process from 'process'
console.log(process.env);
const options: IConnectionParameters = {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DATABASE,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        binary: true
}

console.log(options);

export default pgp()(options)


