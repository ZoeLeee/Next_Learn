import { Redis } from 'ioredis';
import { Session, opts } from 'koa-session';
import e from 'express';

export class RedisStore {
  constructor(private _client: Redis) { }
  private getId(id: string) {
    return "sid:" + id;
  }
  async get(k: string) {
    let data = await this._client.get(this.getId(k));
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }
  async set(k: string, value: Partial<Session> & { _expire?: number, _maxAge?: number }, maxAge?: number, data?: { changed: boolean; rolling: opts["rolling"] }) {
    let id = this.getId(k);
    try {
      let str = JSON.stringify(value);
      if (maxAge) {
        await this._client.setex(id, maxAge, str);
      }
      else {
        await this._client.set(id, str);
      }
    }
    catch (err) {
      console.error(err);
    }
  }
  async destroy(k: string) {
    await this._client.del(this.getId(k));
  }
}