import { randomUUID } from "crypto";
import { Driver } from "src/drivers/entities/driver.entity";
import { Passanger } from "src/passangers/entities/passanger.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum RIDE_STATUS{
    REQUESTED="REQUESTED",
    ONGOING="ONGOING",
    COMPLETED="COMPLETED",
    CANCELLED="CANCELLED",
}

@Entity()
export class Ride {

    @PrimaryGeneratedColumn('uuid')
    id:string = randomUUID()

    @Column({
        type:'enum',
        enum:RIDE_STATUS,
        default:RIDE_STATUS.REQUESTED
    })
    status:RIDE_STATUS;

    @Column({
        nullable:false,
    })
    source:string;

    @Column({
        nullable:false
    })
    destination:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @ManyToOne(()=>Passanger,passanger => passanger.rides,{
        eager:true
    })
    passanger:Passanger

    @ManyToOne(()=>Driver,driver => driver.rides,{
        eager:true
    })
    driver:Driver

}
