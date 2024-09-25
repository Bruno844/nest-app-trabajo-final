import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';
import { CreateDepartamentoDto } from 'src/sistema-reserva/departamentos/dto/create-departamento.dto';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
    id?: number;
    fechaEntrada?: Date;
    fechaSalida?: Date;
    departamento?: CreateDepartamentoDto;
    usuario?: UsuarioDto; 
}
