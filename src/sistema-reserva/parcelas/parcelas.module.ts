import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelaEntity } from './entities/parcela.entity';
import { IngresoEntity } from '../ingresos/entities/ingreso.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ParcelaEntity,IngresoEntity])
  ],
  controllers: [ParcelasController],
  providers: [ParcelasService],
  
})
export class ParcelasModule {}
