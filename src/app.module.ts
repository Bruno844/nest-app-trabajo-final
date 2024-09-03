import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthService } from './usuarios/auth/auth.service';
import { JwtMiddleware } from './usuarios/auth/middlewares/jwt/jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DATABASE,
      entities: [],
      autoLoadEntities: true,//carga las entidades que vayamos creando.
      synchronize: true,//realiza las migraciones de las tablas,las sincroniza
    }),
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
