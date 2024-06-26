import { User } from './user'

export class Alert {
  private _id: string
  private _user: User
  private _cryptoId: string
  private _targetPrice: number
  private _isActive: boolean = true

  constructor(id: string, user: User, cryptoId: string, targetPrice: number) {
    this._id = id
    this._user = user
    this._cryptoId = cryptoId
    this._targetPrice = targetPrice
  }

  get id() {
    return this._id
  }

  get userId() {
    return this._user.id
  }

  get isActive() {
    return this._isActive
  }

  inactivate() {
    this._isActive = false
  }
}
