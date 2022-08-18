class MemoryCache {
  memory = new Map(); // memory object to store data

  // adds new data to memory if it doesn't exist
  // updates an existing data if key already exists
  add(key: string, value: any) {
    this.memory.set(key, value);
  }

  // fetches data that matches key
  get(key: string) {
    return this.memory.get(key);
  }
}

export default new MemoryCache();
