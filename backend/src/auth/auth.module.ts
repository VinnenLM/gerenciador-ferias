import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ColaboradorModule } from 'src/colaborador/colaborador.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from 'src/colaborador/entity/colaborador.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'YH3OBNn5Q&YCAL4ifDl@Y&I4gRxp*Kjz',
    }),
    ColaboradorModule,
    TypeOrmModule.forFeature([Colaborador]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
