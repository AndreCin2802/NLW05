import { Router } from 'express'

import { MessagesController } from '../controller/MessagesController'

const messagesRouter = Router()
const messagesController = new MessagesController()

messagesRouter.post('/', messagesController.create)
messagesRouter.get('/:id', messagesController.showByUser)

export { messagesRouter }
