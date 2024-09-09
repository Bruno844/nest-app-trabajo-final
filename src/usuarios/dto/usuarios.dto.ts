//aca hacemos uso de un dto(data transfer object)
//aca hacemos uso de decoradores y funcionalidades para cuando mandemos esos datos por endpoint, que cumplan ciertas reglas antes de ser insertadas en la base de datos
//esto ahorra problemos a largo plazo ya sea por tipado de datos,o informacion mal almacenada

import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UsuarioDto{
    id:number;

    @IsString()
    nombre: string;

    @IsEmail()
    email: string;


    @IsString()
    @MinLength(8,{
        message: 'deben ser minimo 8 caracteres'
    })
    password:string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean = true;

    @IsString()
    @IsOptional()
    avatar?:string;
}