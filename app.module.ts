import { Inject, MiddlewareConsumer, Module } from '@nestjs/common';
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
import { IpLoggerMiddleware } from './ip-logger/ip-logger.middleware';
import { IploggerModule } from './iplogger/iplogger.module';

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
    IploggerModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
  configure(loggerMiddleware: MiddlewareConsumer){
    loggerMiddleware.apply(IpLoggerMiddleware).forRoutes('*')
  }
}
// DB_NAME=taxi
// DB_USERNAME=postgres
// DB_PASSWORD=neebal
// DB_PORT=5432
// DB_HOST=localhost
// JWT_SECRET_KEY=nikhil
// JWT_EXPIRY=2h