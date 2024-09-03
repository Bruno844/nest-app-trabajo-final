//aca creamos el esquema de la base de datos, de nuestras tablas en la base de datos

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuarios')
export class Usuarios {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 100
    })
    nombre: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
        length: 40
    })
    email: string;


    @Column({
        type: 'varchar',
        nullable: false,
        length: 100
    })
    password:string;

    @Column({
        type: 'bool',
        default: true
    })
    isActive:boolean;

}