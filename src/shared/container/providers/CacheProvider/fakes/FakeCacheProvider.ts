import ICacheProvider from '../models/ICacheProvider'

interface ICacheData {
  [key: string]: string
}

class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {}

  public async add(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value)
  }
  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key]
    if (!data) {
      return null
    }
    const parsedData = JSON.parse(data)
    return parsedData
  }
  public async invalidadePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    )
    keys.forEach(key => {
      delete this.cache[key]
    })
  }
  public async invalidade(key: string): Promise<void> {
    delete this.cache[key]
  }
}

export default FakeCacheProvider
