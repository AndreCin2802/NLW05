import { Router } from 'express'

import { SettingsController } from '../controller/SettingsController'

const settingsRouter = Router()
const settingsController = new SettingsController()

settingsRouter.post('/', settingsController.create)
settingsRouter.get('/:username', settingsController.findByUser)
settingsRouter.put('/:username', settingsController.update)

export { settingsRouter }
