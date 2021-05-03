import { Request, Response } from 'express'

import { SettingsService } from '../services/SettingsService'

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { chat, username } = request.body

    const settingService = new SettingsService()

    const settingCreate = await settingService.create({
      chat,
      username,
    })

    return response.json(settingCreate)
  }

  async findByUser(request: Request, response: Response): Promise<Response> {
    const { username } = request.params

    const settingsService = new SettingsService()

    const settings = await settingsService.findByUserName(username)

    return response.json(settings)
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params

    const { chat } = request.body

    const settingsService = new SettingsService()

    const settings = await settingsService.update(username, chat)

    return response.json(settings)
  }
}

export { SettingsController }
