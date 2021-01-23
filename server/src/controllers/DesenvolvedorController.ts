import {Request, Response} from 'express'
const lodash = require('lodash')

import Developer from '../schemas/Developer'

const findAllPagedSearch = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { page = '1', limit = '5' } = req.query
    
    let filter

    if (req.query.nome) {
      filter = {nome: req.query.nome}
    }

    if (req.query.sexo) {
      filter = {sexo: req.query.sexo}
    }

    if (req.query.idade) {
      filter = {idade: req.query.idade}
    }

    if (req.query.dataNascimento) {
      filter = {dataNascimento: req.query.dataNascimento}
    }

    const developers = await Developer.find({...filter})
    .limit(+limit)
    .skip((+page - 1) * +limit)
    .exec()

    const countPages = await Developer.find({...filter}).countDocuments() 
    
    if (filter && !developers.length) {
      throw new Error('Desenvolvedores não encontratos com o filtro informado.')
    }

    return res.status(200).json({content: developers, totalPages: Math.ceil(countPages / +limit), currentPage: +page})
  } catch (error) {
    return res.status(404).json({errorMessage: error.toString().replace('Error:', '')})
  }
}

const findById = async (req: Request, res: Response): Promise<Response> => {
  try {

    const developer = await Developer.findById(req.params.id)

    if (!developer) {
      throw new Error(`Desenvolvedor com o id ${req.params.id} não encontrato.`)
    }
    
    return res.status(200).json(developer)
  } catch (error) {
    if (error) {
      return res.status(404).json({errorMessage: `Desenvolvedor com o id ${req.params.id} não encontrato.`})
    }
  }
}

const create = async (req: Request, res: Response): Promise<Response> => {
  try {  
    if (lodash.isEmpty(req.body)) {
      throw new Error('Falha ao salvar o novo desenvolvedor.') 
    }
    
    const developer = await Developer.create(req.body)

    return res.status(201).json(developer)
  } catch (error) {      
    if (error) {
      return res.status(400).json({errorMessage: 'Falha ao salvar o novo desenvolvedor.'})
    }
  }
}

const edit = async (req: Request, res: Response): Promise<Response> => {
  try {      
    if (lodash.isEmpty(req.body)) {
      throw new Error(`Falha ao editar o desenvolvedor com o id ${req.params.id}.`) 
    }

    const developer = await Developer.findOneAndUpdate({_id: req.params.id}, req.body)

    return res.status(201).json(developer)
  } catch (error) {      
    return res.status(400).json({errorMessage: `Falha ao editar o desenvolvedor com o id ${req.params.id}.`})
  }
}

const remove = async (req: Request, res: Response): Promise<Response>  => {
  try {
    await Developer.remove({ _id: req.params.id })

    return res.status(204).json({message: 'Desenvolvedor removido com sucesso.'})
  } catch (error) {
    return res.status(400).json({errorMessage: `Falha ao remover o desenvolvedor com o id ${req.params.id}.`})
  }
}

module.exports = {
  findAllPagedSearch,
  findById,
  create,
  edit,
  remove
}