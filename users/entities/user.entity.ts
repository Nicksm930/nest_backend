import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Unique,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Passanger } from 'src/passangers/entities/passanger.entity';

export enum UserRole {
  PASSANGER = 'PASSANGER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN',
}
@Unique(['username']) // username must be unique
// Composite unique constraint on (email, role)
@Entity({ name: 'users' })
@Unique(['email', 'role']) // composite unique constraint
@Index('idx_email', ['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();

  @Column()
    username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PASSANGER,
  })
  role: UserRole;

  @Column({ nullable: false })
  token: string;


  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(
    ()=>Driver,
    (driver) => driver.user,
    {
      cascade: true, // allows automatic insert/update)
    }
  )
  driver:Driver

  @OneToOne(
    ()=>Passanger,(passagner)=>passagner.user,{
      cascade:true
    }
  )
  passanger:Passanger;

  @BeforeInsert()
  async handleBeforeInsert() {
    await this.hashPassword();
    await this.generateToken(); // ✅ Automatically generate JWT token
  }

  private async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  private async generateToken() {
    const payload = {
      email: this.email,
      role: this.role,
    };
    this.token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: process.env.JWT_EXPIRY || '2h',
    });
  }
}
