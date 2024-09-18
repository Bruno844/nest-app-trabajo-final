import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParcelaEntity } from './entities/parcela.entity';
import { Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/entity/usuarios.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ParcelasService {

  constructor(
    @InjectRepository(ParcelaEntity) private readonly parcela: Repository<ParcelaEntity>,
    @InjectRepository(Usuarios) private readonly usuario: Repository<Usuarios>
  ){}


  //*funcion para registrar una parcela
  async registerParcela(ParcelaDto: CreateParcelaDto, id:number){

    try {
      const usuario = await this.usuario.findOne({
        where: {id: id}
      })

      if(!usuario){
        console.log('no existe cliente')
      }

      if(usuario){
        const parcela = this.parcela.create(ParcelaDto);
        parcela.usuario = usuario;
        await this.parcela.save(parcela);
        return parcela;
      }
      
    } catch (error) {
      throw new NotFoundException(`no encontramos cliente con id ${id}`)

    }
  }


  async getAllParcelas(paginationDto: PaginationDto) {

      const {limit= 5, offset = 0} = paginationDto;

    try {

      const parcelas = await this.parcela.find({
        take: limit,
        skip: offset
      });

      return parcelas;

      
    } catch (error) {
      console.log(error);
      throw new BadRequestException('no se pudo mostrar todas las parcelas')
    }
  }
 
}
