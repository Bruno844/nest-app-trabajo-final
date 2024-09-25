import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentoEntity } from '../departamentos/entities/departamento.entity';
import { Repository } from 'typeorm';
import { ReservaEntity, ReservaStatus } from './entities/reserva.entity';
import { Usuarios } from 'src/usuarios/entity/usuarios.entity';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';
import { ParcelaStatus } from '../parcelas/entities/parcela.entity';

@Injectable()
export class ReservasService {

  constructor(
    @InjectRepository(DepartamentoEntity) private readonly departamentoRepository: Repository<CreateReservaDto>,
    @InjectRepository(ReservaEntity) private readonly reservaRepository: Repository<CreateReservaDto>,
    @InjectRepository(Usuarios) private readonly usuarioRepository: Repository<UsuarioDto>
  ){}


  async registerReserva(usuarioId:number, deptoId: number, fechaSalida: Date){

    

    try {

     

      const usuario = await this.usuarioRepository.findOne({
        where: {id: usuarioId}
      });
      if(!usuario){
        return new NotFoundException('usuario no encontrado')
      };

      const departamento = await this.departamentoRepository.findOne({
        where: {id: deptoId }
      });
      if(!departamento){
        return new NotFoundException('departamento no encontrado')
      };

      
     
      const reserva = this.reservaRepository.create({
        usuario, departamento, fechaEntrada: new Date(),fechaSalida
      });

      //*condicion que ingrese una salida
      if(fechaSalida === undefined || fechaSalida === null){
        return new BadRequestException('ingreseuna fecha de salida')
      };
      
      //*condicion de que no puede coincidir la fecha de entrada con la fecha de salida
      if(reserva.fechaEntrada === fechaSalida){
        return new BadRequestException('no podes marcar fecha de salida con la misma fecha de entrada')
      }

      //*comparamos si en el departamento esta en estado pendiente, si es asi, es porque hay alguien ocupandola
      if(reserva.estado === ParcelaStatus.PENDIENTE){
        return new BadRequestException('departamento se puede ocupar')
      };

      //*comparamos si el estado de la reserva esta aprobada, ahi ya no puede registrarse
      if(reserva.estado === ParcelaStatus.APROBADA){
        return new UnauthorizedException(`ya no se puede registrar por que tiene estado ${ReservaStatus.APROBADA}`)
      }


      const result = this.reservaRepository.save(reserva);
      return result;

      
    } catch (error) {
      console.log(error);
      throw new BadRequestException('error a la hora de registrar')
    }
  }


  async getReservaById(id: number){

    try {

      const reserva = await this.reservaRepository.findOne({
        where: {id}
      })
      if(!reserva){
        return new BadRequestException('no existe reserva con eseid')
      }
      
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }

  }


  async compareStatusReserva(id: number, reserva: Partial<CreateReservaDto>){


    try {

      const reservaId = await this.reservaRepository.findOne({
        where: {id}
      })
      if(!reservaId){
        return new BadRequestException('no existe reserva con eseid')
      }

      if(reservaId.estado === ParcelaStatus.APROBADA){
        return  new UnauthorizedException('reserva con estado APROBADA, no puede registrarse')
      }

      
    } catch (error) {
      console.log(error)
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      throw new HttpException('no trajo los datos necesarios', httpStatus)
    }

  }


 
}
