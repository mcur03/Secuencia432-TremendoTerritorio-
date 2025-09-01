export class GetAllUserDto {
  private _first_name: string;
  private _last_name: string;
  private _email: string;
  private _id_number: string;
  private _user_phone: string;
  private _userRole: 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador';

  constructor(
    first_name: string,
    last_name: string,
    email: string,
    id_number: string,
    user_phone: string,
    userRole: 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador'
  ) {
    this._first_name = first_name;
    this._last_name = last_name;
    this._email = email;
    this._id_number = id_number;
    this._user_phone = user_phone;
    this._userRole = userRole;
  }

  // Getters
  get first_name(): string {
    return this._first_name;
  }

  get last_name(): string {
    return this._last_name;
  }

  get email(): string {
    return this._email;
  }

  get id_number(): string {
    return this._id_number;
  }

  get user_phone(): string {
    return this._user_phone;
  }

  get userRole(): 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador' {
    return this._userRole;
  }

  // Setters
  set first_name(value: string) {
    this._first_name = value;
  }

  set last_name(value: string) {
    this._last_name = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set id_number(value: string) {
    this._id_number = value;
  }

  set user_phone(value: string) {
    this._user_phone = value;
  }

  set userRole(value: 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador') {
    this._userRole = value;
  }
}
