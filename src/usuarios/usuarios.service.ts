import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entity/usuarios.entity';
import { Repository } from 'typeorm';
import { UsuarioDto } from './dto/usuarios.dto';
import { AuthService } from './auth/auth.service';

@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuarios) private readonly usuario: Repository<UsuarioDto>,private authService:AuthService
    ){}


    //funcion para registrar un usuario
    async registerUser(usuarioDto: UsuarioDto){
        try {

            //si no tiene contra, error
            if(!usuarioDto.password) throw new UnauthorizedException('not password provided');

            //hasheo de la constraseña
            const hash = await this.authService.hashPassword(usuarioDto.password);
            usuarioDto.password = hash

            //almacenamos en db
            const result = await this.usuario.save(usuarioDto);
            return result;
            
        } catch (error: any) {
            console.error(error);
            throw new HttpException(`${error.name}`, HttpStatus.NOT_FOUND)
            
        }
    }


    //funcion para encontrar un usuario por el id
    /**
     * @description obtiene un usuario
     * @param id id del usuario
     * @returns usuarioDto(toda la data)
     */
    async getUsuarioById(id:number){
        try {
            const usuario = await this.usuario.findOne(
                {where:{id}}
            )

            if(!usuario) throw new NotFoundException('usuario no encontrado')

            return usuario;
            
        } catch (error) {
            console.error(error);
            throw new HttpException(error.message, error.status);
        }
    }

}
