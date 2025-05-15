import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { DriversModule } from './drivers/drivers.module';
import { Driver } from './drivers/entities/driver.entity';
import { VehiclesModule } from './vehicles/vehicles.module';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { RidesModule } from './rides/rides.module';
import { PassangersModule } from './passangers/passangers.module';
import { Passanger } from './passangers/entities/passanger.entity';
import { Ride } from './rides/entities/ride.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(
      { 
        imports: [ConfigModule], 
        inject: [ConfigService],
        useFactory:(configService: ConfigService)=>({
          type:'postgres',
          host:configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username:configService.get('DB_USERNAME'),
          password:configService.get('DB_PASSWORD'),
          database:configService.get('DB_NAME'),
          entities:[User,Driver,Vehicle,Passanger,Ride],
          synchronize:true,
          logging:true
        } )
      }
    ),
    UsersModule,
    DriversModule,
    VehiclesModule,
    RidesModule,
    PassangersModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
// DB_NAME=taxi
// DB_USERNAME=postgres
// DB_PASSWORD=neebal
// DB_PORT=5432
// DB_HOST=localhost
// JWT_SECRET_KEY=nikhil
// JWT_EXPIRY=2h