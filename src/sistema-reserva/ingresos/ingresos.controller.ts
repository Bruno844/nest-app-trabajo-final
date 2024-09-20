import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { Response } from 'express';
import { CreateParcelaDto } from '../parcelas/dto/create-parcela.dto';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';
import { ParcelaStatus } from '../parcelas/entities/parcela.entity';

@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) {}


  @Post('/new-ingreso')
  async createIngreso(
    @Body('usuarioId') usuarioId: number,
    @Body('parcelaId') parcelaId: number,
   
    @Res() res: Response
  ){
    const result = await this.ingresosService.registerIngreso(usuarioId,parcelaId);
    res.status(HttpStatus.CREATED).json({result,msg: 'creado con exito'})
  }

}
