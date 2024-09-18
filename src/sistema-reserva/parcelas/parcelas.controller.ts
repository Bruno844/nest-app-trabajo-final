import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';


@Controller('parcelas')
export class ParcelasController {
  constructor(private readonly parcelasService: ParcelasService) {}

  
}
