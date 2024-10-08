import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entity/usuarios.entity';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { saveImagesToStorage } from '../helpers/image-storage';
import { envs } from '../config';

@Module({
  //importamos la entidad para trabajar con ella en nuestro modulo
  imports: [TypeOrmModule.forFeature([Usuarios]),
  JwtModule.register({
    secret: envs.jwt,
    signOptions: {
      expiresIn: '24h'
    },
  }),
  //usamoselmodulo de multer y configuramos el storage y el destino donde sera alojado las imagenes subidas
  MulterModule.register({
    dest: './uploads',
    fileFilter: saveImagesToStorage('avatar').fileFilter,
    storage: saveImagesToStorage('avatar').storage
  }),
 
  ],

  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService],
  exports: [AuthService,UsuariosService]
})
export class UsuariosModule { }
