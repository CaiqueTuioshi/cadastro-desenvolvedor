import {Router} from 'express'

import DesenvolvedorController from './controllers/DesenvolvedorController'

const routes = Router()

routes.get('/developers', DesenvolvedorController.findAllPagedSearch)
routes.get('/developers/:id', DesenvolvedorController.findById)
routes.post('/developers', DesenvolvedorController.create)
routes.put('/developers/:id', DesenvolvedorController.edit)
routes.delete('/developers/:id', DesenvolvedorController.delete)

export default routes