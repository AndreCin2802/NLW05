import './websocket/client'
import './websocket/admin'

import { http } from './http'
const port = 3333
http.listen(port, () => console.log('Server Running on port', port))
