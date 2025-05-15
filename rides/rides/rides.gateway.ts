import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { log } from 'console';
import { Server, Socket } from 'socket.io';
import { Ride } from '../entities/ride.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Repository } from 'typeorm';
import { RidePayload } from '../rides.service';

@WebSocketGateway({
  cors:{
    origin:'*',
    methods: ['GET', 'POST'],
  }
})
export class RidesGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{

  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository:Repository<Driver>
  ){}

  @WebSocketServer()
  server: Server;

  private driverConnections= new Map<string,Socket>()
  
  afterInit(server: Server) {
      console.log("Server Initialized");    
  }

  handleConnection(client: Socket) {
      console.log(`Client connected : ${client.id}`);    
  }

  handleDisconnect(client: Socket) {
      console.log(`Client DisConnected : ${client.id}`);    
  }

  broadcastRide(rideData: RidePayload){
    
    this.driverConnections.forEach((client,driverId)=>{

      console.log(`Ride with ride_id:${rideData.ride.id} and passenger_id ${rideData.passengerId} is emitted to driver_id:${driverId}`);
      
      client.emit('IncommingRide',rideData)
    })
    
  }
  notifyAcceptedRideToUser(){
    
  }
  @SubscribeMessage('driverconnect')
  async handleDriverConnect(client: Socket, payload:any) {
   
    const { driverId }=JSON.parse(payload);
    const allActiveDriver=await this.driverRepository.find();
    console.log(allActiveDriver);
    const selectedDriver=allActiveDriver.filter((driver)=>{
          return driver.id == driverId
         })
    if(selectedDriver.length > 0){
      this.driverConnections.set(driverId, client);
      console.log("selectedDriver",selectedDriver);  
    }
    console.log(`Driver ${driverId} connected`);
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log(typeof payload);
    const {driverId}=JSON.parse(payload);
    log(driverId)

    return 'Hello world!';
  }
 
}
