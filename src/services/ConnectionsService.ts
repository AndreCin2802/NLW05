import { getCustomRepository, Repository } from 'typeorm'

import { Connection } from '../entities/Connection'
import { Setting } from '../entities/Setting'
import AppError from '../errors/AppError'
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'
import { SettingsRepository } from '../repositories/SettingsRepository'

interface IConnectionCreate {
  socket_id: string
  user_id: string
  admin_id?: string
  id?: string
}
class ConnectionsService {
  private connectionsRepository: Repository<Connection>

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository)
  }

  async create({
    socket_id,
    user_id,
    admin_id,
    id,
  }: IConnectionCreate): Promise<Connection> {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    })

    await this.connectionsRepository.save(connection)

    return connection
  }

  async findByUserId(user_id: string): Promise<Connection> {
    const connection = await this.connectionsRepository.findOne({
      user_id,
    })

    return connection
  }

  async findBySocketID(socket_id: string): Promise<Connection> {
    const connection = await this.connectionsRepository.findOne({
      socket_id,
    })

    return connection
  }

  async findAllWithoutAdmin(): Promise<Connection[]> {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    })

    return connections
  }
}

export { ConnectionsService }
