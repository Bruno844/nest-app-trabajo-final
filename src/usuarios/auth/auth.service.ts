import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from '../dto/usuarios.dto';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService){}


    /**
     * @param password new user's password
     * @returns hashed password
     */
    async hashPassword(password:string): Promise<string>{
        return bcrypt.hash(password,10);
    }

    /**
     * @description compares the login password with the stored
     * @param password input password
     * @param hashPassword stored users password
     * @return boolean
     */
    async comparePassword(password:string,hashPassword:string):Promise<boolean>{
        return bcrypt.compare(password,hashPassword)
    }


    /**
     * @description compare user session jwt
     * @param jwt jwt from client
     * @returns payload
     */
    async verifyJwt(jwt:string): Promise<any>{
        return await this.jwtService.verifyAsync(jwt);
    }


    //generamos el token
    /**
     * @param Usuario
     * @returns generated token
     */
    async generateToken(usuario:UsuarioDto): Promise<string> {
        /**
         * @description
         * creamos el payload con la info del usuario
         * va hacer como el conjunto de datos dentro del token
         */
        const payload = {
            sub: usuario.id,
            email: usuario.email,
            nombre: usuario.nombre
        };
        //* retornamos el token
        return this.jwtService.signAsync(payload)
    }
}