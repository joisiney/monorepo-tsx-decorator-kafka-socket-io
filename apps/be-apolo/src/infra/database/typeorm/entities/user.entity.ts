
import { IUserDto } from '@olympus/domain-ceos'
import bcrypt from 'bcrypt'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('user')
export class UserTypeORM implements IUserDto {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar', unique: true })
  email!: string

  // @deprecated password optional
  @Column({ type: 'varchar', nullable: true })
  password!: string

  @Column({ type: 'varchar', nullable: true })
  address!: string | null

  @Column({ type: 'date', nullable: true })
  birthdate!: Date | null

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @BeforeInsert()
  @BeforeUpdate()
  async before() {
    if (!this.password) throw new Error('Password not found')
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    if (!this.createdAt) this.createdAt = new Date()
  }

  comparePassword(password: string) {
    if (!this.password) return false
    try {
      return bcrypt.compare(password, this.password)
    } catch {
      return false
    }
  }
}
