import express, { Response } from 'express'
import { CoinGeckoController } from './controllers';

const PORT = 3800

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// create a generic end point for checking the status of server
app.get('/health', (_, res: Response) => {
  res.status(200).json({ success: true, message: 'OK', data: null })
})


app.get('/list', CoinGeckoController.GetList)

app.get('/asset/:id',CoinGeckoController.GetItem)


const initApp = () => {
  app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`)
  })
}

export { initApp }
