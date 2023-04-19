import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BalanceModule } from './modules/balances/balances.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    JwtModule.register({
      secret: 'secret-key',
      signOptions: { expiresIn: '6h' }
    }),
    UsersModule,
    AuthModule,
    BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
