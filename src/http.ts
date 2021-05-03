import './database'
import 'express-async-errors'

import ejs from 'ejs'
import express, { NextFunction, Request, Response } from 'express'
import { createServer } from 'http'
import path from 'path'
import { Server, Socket } from 'socket.io'

import AppError from './errors/AppError'
import { routes } from './routes'
const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html')
})

app.get('/pages/admin', (request, response) => {
  return response.render('html/admin.html')
})

const http = createServer(app) // Criando protoclo http
const io = new Server(http) // Criando protocolo ws

io.on('connection', (socket: Socket) => {
  console.log('se conectou', socket.id)
})

app.use(express.json())
app.use(routes)

app.use(
  (error: Error, req: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
)

export { http, io }
