//aca creamos el esquema de la base de datos, de nuestras tablas en la base de datos

import { ParcelaEntity } from "src/sistema-reserva/parcelas/entities/parcela.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @Column({type: 'varchar',nullable: false,length:255})
    avatar:string;


   @ManyToOne(
    () => ParcelaEntity,
    (parcela) => parcela.usuario,
    {eager: true}
   )
   parcela: ParcelaEntity

}