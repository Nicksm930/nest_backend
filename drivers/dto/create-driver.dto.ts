import { STATUS } from "../entities/driver.entity";


export class CreateDriverDto { 
   isActive?:boolean;
   status?:STATUS;   
}
