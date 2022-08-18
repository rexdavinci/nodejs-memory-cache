import axios from "axios";
class CoingeckoService {
  isOnline = false;
  async status() {
    const response = await axios.get('https://api.coingecko.com/api/v3/ping')
    if(response.data.hasOwnProperty('gecko_says')) {
      this.isOnline = true;
    }
  }

  async connected() {
    if(!this.isOnline) {
      await this.status();
      if(!this.isOnline) return null;
    }
  }

  async coinList() {
    try {
      // attempt to connect only once 
      await this.connected()
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
      return response.data;
    } catch(e) {
      return null;
    }
  }

  // get info about specific token/coin

  async itemData(id: string) {
    try {
      // attempt to connect only once 
      this.connected()
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false`)
      return response.data;
    } catch(e) {
      return null;
    }
  }
}

export default new CoingeckoService();
