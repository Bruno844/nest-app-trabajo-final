import { Module } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { IngresosController } from './ingresos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoEntity } from './entities/ingreso.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([IngresoEntity])
  ],
  controllers: [IngresosController],
  providers: [IngresosService],
  
})
export class IngresosModule {}
