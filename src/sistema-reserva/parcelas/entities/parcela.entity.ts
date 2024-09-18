import { IngresoEntity } from "src/sistema-reserva/ingresos/entities/ingreso.entity";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ParcelaStatus {
    PENDIENTE = 'PENDIENTE',
    OCUPADA = 'OCUPADA',
    LIBRE = 'LIBRE'
}

@Entity('parcelas')
export class ParcelaEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 50
    })
    nombreParcela: string;

    @Column({
        type: 'uuid',
        nullable: false,
        unique: true,
        generated: 'uuid'
    })
    codigoUnico: number;

    @Column({
        type: 'enum',
        enum: ParcelaStatus,
        default: ParcelaStatus.PENDIENTE
    })
    estado: ParcelaStatus;


    
    // @OneToOne(
    //     () => IngresoEntity,
    //     (ingreso) => ingreso.usuario.id
    // )
    // ingresoUsuario: IngresoEntity;

    //*una parcela tiene muchos ingresos, pero vamos a mostrar el id del usuario
    @ManyToOne(
        () => IngresoEntity,
        (ingreso) => ingreso.usuario.id
    )
    ingresoCliente: IngresoEntity;

    @OneToMany(
        () => Usuarios,
        (usuario) => usuario.parcela,
        {eager: true}
    )
    usuario: Usuarios

}
