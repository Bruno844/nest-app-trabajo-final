import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envs } from "./envs";
import { env } from "process";





export const db: TypeOrmModuleOptions={
    type: 'mysql',
    host: envs.host,
    username: envs.user,
    password: envs.pass,
    database: envs.database,
    entities: [],
    autoLoadEntities: true,
    synchronize: true
}