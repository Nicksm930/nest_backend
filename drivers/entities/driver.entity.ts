import { randomUUID } from 'crypto';
import { Ride } from 'src/rides/entities/ride.entity';
import { User } from 'src/users/entities/user.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum STATUS {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
  SUSPENDED = 'SUSPENDED',
}

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid') // ✅ Primary key
  id: string = randomUUID();

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: STATUS,
    default: STATUS.PENDING,
  })
  status: STATUS;

  @OneToOne(() => User, (user) => user.driver, {
    eager: true,
  })
  @JoinColumn() // owns the relationship, holds foreign key
  user: User;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.driver, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  vehicle: Vehicle;

  @OneToMany(() => Ride, (ride) => ride.driver, {
    cascade: true,
  })
  @JoinColumn()
  rides: Ride[];
}
