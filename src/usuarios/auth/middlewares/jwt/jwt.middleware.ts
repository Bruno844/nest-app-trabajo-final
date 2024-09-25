import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {

  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuariosService,
  ){}

  //*con el middleware,interceptamos las peticiones en donde, si no le pasan el token por la authorization, que no los deje avanzar hacia la peticion, es una buena manera de proteger rutas, implementarlo en diferentes escenarios es buena practica,mas robusto el backend
  async use(req: Request, res: Response, next: () => void) {

    try {
      //* obtenemos el token desde el header de la peticion
      const tokenArray: string[] = req.headers['authorization'].split(" ")

      const decodedToken = await this.authService.verifyJwt(tokenArray[1]);

      if(decodedToken){
        //* asignamos token a ese usuario
        const usuario = await this.usuarioService.getUsuarioById(decodedToken.sub);
        //* si el usuario existe, que pase el middleware, de lo contrario no lo deja pasar
        if(usuario) next();
        else throw new UnauthorizedException('token invalido');
      }else{
        throw new UnauthorizedException('token invalido')
      }
      
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('token invalido')
    }
  }
}
