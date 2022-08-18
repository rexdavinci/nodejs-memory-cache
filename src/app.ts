import express, { Response } from 'express'
import middleware from './middleware';
import { CoinGeckoController } from './controllers';

const PORT = 3800

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// create a generic end point for checking the status of server
app.get('/health', (_, res: Response) => {
  res.status(200).json({ success: true, message: 'OK', data: null })
})

// request for coin list from coingecko
app.get('/list', middleware.getList, CoinGeckoController.GetList)

// request for an asset info from coingecko
app.get('/asset/:id', middleware.getItem, CoinGeckoController.GetItem)


const initApp = () => {
  app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`)
  })
}

export { initApp }
