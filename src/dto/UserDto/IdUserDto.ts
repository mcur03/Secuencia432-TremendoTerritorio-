export class IdUserDto {

    private _idUser: number;


    constructor(
        idUser:number
    ) {
        this._idUser = idUser;
    }

    // Getters
    get idUser(): number {
        return this._idUser;
    }
    // Setters
    set idUser(idUser:number){
        this._idUser = idUser;
    }
};
