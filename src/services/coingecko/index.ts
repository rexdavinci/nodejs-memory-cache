import axios from "axios";
class CoingeckoService {
  isOnline = false;
  async status() {
    const response = await axios.get('https://api.coingecko.com/api/v3/ping')
    if(response.data.hasOwnProperty('gecko_says')) {
      this.isOnline = true;
    }
  }

  // check the state of CG API only once after application starts
  async connected() {
    if(!this.isOnline) {
      await this.status();
    }
  }

  async coinList() {
    try {
      // attempt to connect only once 
      await this.connected()
      if(!this.isOnline) return null
      const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
      return data;
    } catch(e) {
      return null;
    }
  }

  // get info about specific token/coin
  async itemData(id: string) {
    try {
      // attempt to connect only once 
      await this.connected()
      if(!this.isOnline) return null
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false`)
      return data;
    } catch(e) {
      return null;
    }
  }
}

export default new CoingeckoService();
