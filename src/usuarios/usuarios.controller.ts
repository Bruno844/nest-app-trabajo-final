import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dto/usuarios.dto';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {

    constructor(private readonly usuarioService: UsuariosService){}


    @Post('/auth/register')
    async register(@Body() usuario:UsuarioDto, @Res() response: Response){
        const result = await this.usuarioService.registerUser(usuario);
        response
            .status(HttpStatus.CREATED)
            .json({ok:true,result,msg: 'creado con exito'})
    }

    @Post('/auth/login')
    async login(){}



}
