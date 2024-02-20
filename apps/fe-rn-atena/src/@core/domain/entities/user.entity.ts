import { IUserDto, UserEntity } from '@olympus/domain-ceos'
import { IOptional } from '@olympus/lib-hera'

export class AppUserEntity extends UserEntity {
  constructor(data: IOptional<IUserDto, 'id' | 'createdAt'>) {
    super(data)
  }
  hasUniqueTitle(title: string) {
    return this.title.trim().toUpperCase() === title.trim().toUpperCase()
  }

  get title() {
    return this.data.name
  }

  toCreate() {
    return {
      name: this.data.name,
      email: this.data.email,
      address: this.data.address,
      birthdate: this.data.birthdate,
      password: this.data.password,
    }
  }
  toUpdate() {
    return {
      id: this.data.id,
      name: this.data.name,
      email: this.data.email,
      address: this.data.address,
      birthdate: this.data.birthdate,
    }
  }
}
