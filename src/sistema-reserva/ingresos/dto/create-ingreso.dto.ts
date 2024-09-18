import { IsDate, IsOptional } from "class-validator";
import { CreateParcelaDto } from "src/sistema-reserva/parcelas/dto/create-parcela.dto";
import { UsuarioDto } from "src/usuarios/dto/usuarios.dto";

export class CreateIngresoDto {

    id: number;

    @IsDate()
    entrada: Date;

    @IsOptional()
    @IsDate()
    salida: Date;

    usuario: UsuarioDto

    parcela: CreateParcelaDto
}
