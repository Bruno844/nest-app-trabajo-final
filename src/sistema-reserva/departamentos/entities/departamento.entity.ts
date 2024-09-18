import { ReservaEntity } from "src/sistema-reserva/reservas/entities/reserva.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum DepartamentoStatus {
    PENDIENTE = 'PENDIENTE',
    OCUPADA = 'OCUPADA',
    LIBRE = 'LIBRE'
}


@Entity('departamentos')
export class DepartamentoEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        type: 'int',
        default: 0,
        nullable: false
    })
    nroDepartamento: number;


    @Column({
        type: 'enum',
        enum: DepartamentoStatus,
        default: DepartamentoStatus.PENDIENTE
    })
    estado: DepartamentoStatus;


    //*un departamento puede tener muchas reservas(maximo 2)
    @OneToMany(
        () => ReservaEntity,
        (reserva) => reserva.departamento
    )
    reserva: ReservaEntity;


    
}
