import { randomUUID } from "crypto";
import { Ride } from "src/rides/entities/ride.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Passanger {
    
    @PrimaryGeneratedColumn('uuid')
    id:string = randomUUID()

    @Column({
        default:true
    })
    isActive:boolean;

    @Column({
        nullable:true
    })
    wallet:number;

    @OneToOne(()=>User,user=>user.passanger)
    @JoinColumn()
    user:User

    @OneToMany(()=>Ride,ride=>ride.passanger,{
        cascade:true    
    })
    @JoinColumn()
    rides:Ride[]
}
