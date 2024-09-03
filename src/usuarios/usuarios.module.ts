import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entity/usuarios.entity';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  //importamos la entidad para trabajar con ella en nuestro modulo
  imports: [TypeOrmModule.forFeature([Usuarios]),
  JwtModule.registerAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get('JWT_SEED'),
        signOptions: {
          expiresIn: '1h'
        },
      }
     
    },
  }),
],
 
  controllers: [UsuariosController],
  providers: [UsuariosService,AuthService],
  exports: [AuthService,UsuariosService]
})
export class UsuariosModule {}
