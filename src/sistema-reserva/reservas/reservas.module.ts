import { Module } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from './entities/reserva.entity';
import { Usuarios } from 'src/usuarios/entity/usuarios.entity';
import { DepartamentoEntity } from '../departamentos/entities/departamento.entity';

@Module({
  controllers: [ReservasController],
  providers: [ReservasService],
  imports: [
    TypeOrmModule.forFeature([ReservaEntity,Usuarios,DepartamentoEntity])
  ]
})
export class ReservasModule {}
