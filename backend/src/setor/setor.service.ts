import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SetorService {
  constructor(private readonly prisma: PrismaService) {}
  async listarSetores() {
    return this.prisma.setor.findMany();
  }
}
