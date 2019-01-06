import { Injectable } from '@angular/core';

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public first_name?: string,
    public last_name?: string,
    public group?: string,
    public photo?: any
  ) {}

  static create(data: any): User {
    return new User(
      data.id,
      data.username,
      data.first_name,
      data.last_name,
      data.group,
      `/media/${data.photo}`
    );
  }
}

@Injectable()
export class AuthService {

  constructor() { }
}
