import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entity/usuarios.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UsuarioDto } from './dto/usuarios.dto';
import { AuthService } from './auth/auth.service';
import { LoginUsuarioDto } from './dto/login.usuarios.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


@Injectable()
export class UsuariosService {

    constructor(
        @InjectRepository(Usuarios) private readonly usuario: Repository<UsuarioDto>,private authService:AuthService,
        private jwtService: JwtService
    ){}


    private getJwtToken(payload: JwtPayload){
        const token = this.jwtService.sign(payload);
        return token;
    }


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


    //funcion para iniciar sesion del usuario
    async loginUser(loginUsuarioDto: LoginUsuarioDto) {

        const {password, email} = loginUsuarioDto;

        //obtenemos el usuario por su email y pass
        const user = await this.usuario.findOne({
            where: {email},
            select: {email:true, password: true, id: true}
        })


        //nos fijamos si trae o no el usuario
        if(!user){
            throw new UnauthorizedException('credenciales no validas')
        }

        //comparamos la contra del usuario con la que esta en la base de datos
        if(!bcrypt.compareSync(password, user.password)){
            throw new UnauthorizedException('password no valida')
        }

        //retorna si todo sale ok
        return {
            ...user,
            token: this.getJwtToken({...user})
        }

    }

    


    //*------------------SECCION CRUD--------------------------------//



    //funcion para retornar todos los usuarios
    async getAllUsuarios(paginationDto: PaginationDto){

        const {limit = 5, offset = 0} = paginationDto

        try {

            const users = await this.usuario.find({
                take: limit,
                skip: offset
            })

            return users;
            
        } catch (error) {
            console.log(error)
            const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
            throw new HttpException('no trajo los datos necesarios', httpStatus)
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

    async updateUser(
        id: number,
        user: Partial<UsuarioDto>,
        files: Express.Multer.File[]
    ) {

        try {
            //comprobamos que al menos se subio 1 archivo, si es asi, le asignamos a ña 1ra posicion con su nombre
            if(files.length > 0){
                user.avatar = files[0].filename;
            }
            const oldUser = await this.getUsuarioById(id);

            const mergeUser = await this.usuario.merge(oldUser, user)

            const result = await this.usuario.save(mergeUser);

            return result;
            
        } catch (err) {
            console.error(err);
            if(err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message,err.status);
        }


    }


    //funcion para eliminar un usuario
    async removeUsuario(id:string) {
        const userId = await this.getUsuarioById(+id);

        return await this.usuario.remove(userId);  
    }

}
