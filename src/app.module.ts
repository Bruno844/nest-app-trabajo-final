import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthService } from './usuarios/auth/auth.service';
import { JwtMiddleware } from './usuarios/auth/middlewares/jwt/jwt.middleware';
import { db } from './usuarios/config/database-config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(db),
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {

  //rutas protegidas usando el token
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude(
      {
        path: '/usuarios/auth/register',
        method: RequestMethod.POST
      },
      {
        path: '/usuarios/auth/login',
        method: RequestMethod.POST
      }
    ).forRoutes('');
  }
}
