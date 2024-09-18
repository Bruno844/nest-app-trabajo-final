import { DepartamentoEntity } from "src/sistema-reserva/departamentos/entities/departamento.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('reservas_deptos')
export class ReservaEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        type: 'date',
    })
    fechaEntrada: Date;

    @Column({
        type: 'date'
    })
    fechaSalida: Date;


    //*muchas reservas un solo departamento(se puede reservar hasta dos reservas en un mismo departamento)
    @ManyToOne(
        () => DepartamentoEntity,
        (depto) => depto.reserva
    )
    departamento: DepartamentoEntity


}
