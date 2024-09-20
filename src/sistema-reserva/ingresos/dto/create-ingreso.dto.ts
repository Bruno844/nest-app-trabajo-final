import { isDate, IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateParcelaDto } from "src/sistema-reserva/parcelas/dto/create-parcela.dto";
import { UsuarioDto } from "src/usuarios/dto/usuarios.dto";

export class CreateIngresoDto {

    id: number;

    // @IsDate({})
    @IsDateString({strict: false })
    entrada: Date;

    @IsOptional()
    @IsDateString({strict: false})
    salida: Date;

    @IsNotEmpty()
    usuario: UsuarioDto;

    @IsInt()
    @IsNotEmpty()
    parcela: CreateParcelaDto;
}
