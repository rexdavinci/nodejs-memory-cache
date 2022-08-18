import { Response, Request } from 'express'
import memCache from '../memCache';
import { coingecko } from '../services'

export default class CoingeckoController {
  static GetList = async (_: Request, res: Response) => {
    const data = await coingecko.coinList();
    memCache.add('list', data) // store list to memory
    return res.status(200).json({ success: true, message: 'from CG', data })
  }
  
  static GetItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await coingecko.itemData(id)
    memCache.add(id, data) // store item to memory
    return res.status(200).json({ success: true, message: 'from CG', data })
  }
}
