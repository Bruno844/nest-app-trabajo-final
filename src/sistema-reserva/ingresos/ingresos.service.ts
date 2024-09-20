import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IngresoEntity } from './entities/ingreso.entity';
import { Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/entity/usuarios.entity';
import { UsuarioDto } from 'src/usuarios/dto/usuarios.dto';
import { ParcelaEntity, ParcelaStatus } from '../parcelas/entities/parcela.entity';
import { CreateParcelaDto } from '../parcelas/dto/create-parcela.dto';
import { ChangeParcelaStatusDto } from '../parcelas/dto/parcela-status.dto';
import { ParcelasService } from '../parcelas/parcelas.service';

@Injectable()
export class IngresosService {

  constructor(
    @InjectRepository(ParcelaEntity) private readonly parcelaDto: Repository<CreateParcelaDto>,
    @InjectRepository(IngresoEntity) private readonly ingresoDto: Repository<CreateIngresoDto>,
    @InjectRepository(Usuarios) private readonly usuarioDto: Repository<UsuarioDto>,
    private readonly parcelaService: ParcelasService
  ) { }


  //*funcion para registrar un ingreso relacionando una parcela y un usuario
  //*ya una vez registrada, pasaria a estado OCUPADA
  // ocupar parcela
  // chequear que exista la parcela y que no este ocupada
  // chequear que exista el usuario 
  // cargar el usuario
  // cargar la fecha actual en ingresos/entrada
  // cambiar a true la ocupacion parcela/ocupacion
  async registerIngreso(usuarioId:number, parcelaId:number):Promise<CreateIngresoDto> {
    
    try {
      const usuario = await this.usuarioDto.findOne({
        where: {id: usuarioId}
      })
      if(!usuario){
        throw new NotFoundException('usuario no encontrado')
      }


      const parcela = await this.parcelaDto.findOne({
        where: {id: parcelaId}
      })
      if(!parcela){
        throw new BadRequestException('parcela no encontrada');

      }

      if(parcela.estado === ParcelaStatus.OCUPADA){
        throw new BadRequestException('parcela ocupada')
      }


      const ingreso = this.ingresoDto.create({
        usuario, parcela, entrada: new Date(), salida:null
      });

      if(ingreso){
        this.parcelaService.updateParcela(parcelaId);
      }

      

      const result = this.ingresoDto.save(ingreso);
      return result;

    
      // const usuarioFound = await this.usuario.find({
      //   where: { id: usuario.id }
      // })

      // if (!usuarioFound) {
      //   return new BadRequestException(`no se puede registrar usuario con mail ${parcela.id}`)
      // }

      // const parcelaFound = await this.parcelaDto.find({
      //   where: { id: parcela.id },
      //   // select: {id: true}
      // })

      // if (!parcelaFound) {
      //   throw new BadRequestException(`no se puede registrar la parcela con id ${parcela.id}`)
      // }

      // const parcelaFound = await this.parcelaRepository.findOneBy({
      //   id: parcela.id,
      // });
      // if (!parcelaFound) throw new NotFoundException(`Parcela no encontrada ${parcelaFound}`);
      // // if (parcelaFound.estado === 'PENDIENTE') throw new NotFoundException(`Parcela ${parcelaFound.id} ocupada`);

      // const usuarioFound = await this.usuarioRepository.findOne({ where: { id: usuario.id } });
      // if (!usuarioFound) throw new NotFoundException('Usuario no encontrado');



      // const parcelaEstado = parcela.estado;
      // if(parcelaEstado === 'PENDIENTE'){
      //   await this.ingreso.save(ingresoDto);
      // }

      

    


    } catch (error) {
      console.log(error);
      throw new BadRequestException('error a la hora de registrar')
    }

  }


  async registrarSalida(){
    
  }


}
