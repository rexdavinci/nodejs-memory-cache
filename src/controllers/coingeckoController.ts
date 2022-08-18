import { Response, Request } from 'express'
import { coingecko } from '../services'

export default class CoingeckoController {
  static GetList = async (_: Request, res: Response) => {
    const data = await coingecko.coinList(); // data could be null 
    return res.status(200).json({ success: true, message: '', data })
  }
  
  static GetItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await coingecko.itemData(id)
    return res.status(200).json({ success: true, message: '', data })
  }
}
