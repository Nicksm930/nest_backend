import { randomUUID, UUID } from "crypto";
import { Driver } from "src/drivers/entities/driver.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum VEHICLE_TYPE{
    STANDARD="STANDARD",
    EXECUTIVE="EXECUTIVE",
    PARTY="PARTY"
}

export enum VEHICLE_STATUS{
    VERIFIED="VERIFIED",
    PENDING="PENDING",
    REVERIFICATION="REVERIFICATION"
}

@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn('uuid')
    id:string=randomUUID();

    @Column({
        type:'enum',
        enum:VEHICLE_TYPE,
        default:VEHICLE_TYPE.STANDARD
    })
    vehicleType:VEHICLE_TYPE

    @Column({unique:true,
        nullable:false
    })
    vehicleNumber:string

    @Column({unique:true,
        nullable:false
    })
    vehicleChasisNumber:string

    @Column({
        nullable:true
    })
    vehiclePhoto:string

    @Column({
        type:'enum',
        enum:VEHICLE_STATUS,
        default:VEHICLE_STATUS.PENDING
    })
    vehicleStatus:VEHICLE_STATUS;

    @OneToOne(()=>Driver, driver => driver.vehicle)
    driver:Driver;

}

