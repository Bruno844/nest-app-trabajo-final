import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
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
    @Body('codigoUnico',ParseUUIDPipe) codUnico: string,
    @Res() res: Response
  ){
    const result = await this.ingresosService.registerIngreso(usuarioId,parcelaId,codUnico);
    res.status(HttpStatus.CREATED).json({result,msg: 'creado con exito'})
  }

  @Post('/:id/marcar-salida')
  async marcarSalida(
    @Body('usuarioId') usuarioId: number,
    @Body('parcelaId') parcelaId: number,
    @Param('id', ParseIntPipe) ingresoId: number,
    @Res() res:Response
  ){
    const result = await this.ingresosService.registrarSalida(parcelaId,usuarioId,ingresoId);
    res.status(HttpStatus.ACCEPTED).json({result, msg: 'actualizado con exito'})
  }

}
