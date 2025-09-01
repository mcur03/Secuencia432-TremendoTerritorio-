export class UserProfileDto {
    
    private _id: string;
    private _firstName: string;
    private _lastName: string;
    private _idNumber: string;
    private _email : string;
    private _userPhone: string;
    private _role: string;

    constructor(
        id:string, email : string, firstName: string,
        lastName: string, userPhone: string, idNumber: string, role: string
    ) {
        this._id = id;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._userPhone = userPhone;
        this._idNumber = idNumber;
        this._role = role;
    }

    // Getters
    get id(): string {
        return this._id;
    }
    get email(): string {
        return this._email;
    }
    get firstName(): string {
        return this._firstName;
    }
    get lastName(): string {
        return this._lastName;
    }
    get userPhone(): string {
        return this._userPhone;
    }

    get idNumber(): string {
        return this._idNumber;
    }

    get role(): string {
        return this._role;
    }
    // Setters
    set id(id:string){
        this._id = id;
    }
    set email(email: string) {
        this._email = email;
    }
    set firstName(firstName: string) {
        this._firstName = firstName;
    }
    set lastName(lastName: string) {
        this._lastName = lastName;
    }
    set userPhone(userPhone: string) {
        this._userPhone = userPhone;
    }
    set idNumber(idNumber: string) {
        this._idNumber = idNumber;
    }
    set role(role: string) {
        this._role = role;
    }
};
