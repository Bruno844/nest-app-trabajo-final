import { ParcelaEntity } from "src/sistema-reserva/parcelas/entities/parcela.entity";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ingresos')
export class IngresoEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    //cuando la usa
    @Column({ type: 'date', nullable: false })
    entrada: Date
    @Column({ type: 'date', nullable: true })
    salida: Date

    //quien ingresa
    @ManyToOne(() => Usuarios, usuario => usuario.id)
    @JoinColumn({name: 'usuarioId'})
    usuario: Usuarios;
    
    //a que parcela
    @ManyToOne(() => ParcelaEntity, (parcela) => parcela.id)
    @JoinColumn({name: 'parcelaId'})
    parcela: ParcelaEntity;
}
