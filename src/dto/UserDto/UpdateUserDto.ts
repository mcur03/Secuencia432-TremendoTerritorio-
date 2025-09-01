export class UpdateUserDto {
    private _id: number;
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _user_phone: string;

    constructor(
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        user_phone: string
    ) {
        this._id = id;
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._user_phone = user_phone;
        this._user_phone = user_phone;
    }

    // Getters
    get id(): number {
        return this._id;
    }

    get first_name(): string {
        return this._first_name;
    }

    get last_name(): string {
        return this._last_name;
    }

    get email(): string {
        return this._email;
    }

    get user_phone(): string {
        return this._user_phone;
    }

    // Setters
    set id(value: number ) {
        this._id = value;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    set email(value: string) {
        this._email = value;
    }

    set user_phone(value: string) {
        this._user_phone = value;
    }
}
