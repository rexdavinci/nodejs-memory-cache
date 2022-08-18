import { NextFunction, Request, Response } from 'express'
import memCache from '../memCache'

class Middleware {
  // fetch the list
  async getList(_: Request, res: Response, next: NextFunction) {
    if(memCache.memory.size > 0) { // check if memory is already in use
      const data = memCache.get('list') // find data with key 'list' from memory
      if(data) { 
        return res.status(200).json({ success: true, message: 'from mem-cache', data })
      }
    } 
    next() // continue
  }

  // get a specific item from the list
  async getItem(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    if(memCache.memory.size > 0) {
      // check memory
      const data = memCache.get(id)
      if(data) {
        return res.status(200).json({ success: true, message: 'from mem-cache', data })
      }
    } 
    next()
  }
}

export default new Middleware()