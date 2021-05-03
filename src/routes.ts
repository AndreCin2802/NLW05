import { Router } from 'express'

import { messagesRouter } from './routes/messages.routes'
import { settingsRouter } from './routes/settings.routes'
import { usersRouter } from './routes/users.routes'
const routes = Router()

routes.use('/settings', settingsRouter)
routes.use('/users', usersRouter)
routes.use('/messages', messagesRouter)

export { routes }
