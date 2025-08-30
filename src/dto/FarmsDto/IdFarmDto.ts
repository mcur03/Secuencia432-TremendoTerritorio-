export class IdFarmDto {
    
    private _id: string;
    

    constructor(
        id:string
    ) {
        this._id = id;
    }

    // Getters
    get id(): string {
        return this._id;
    }
    // Setters
    set id(id:string){
        this._id = id;
    }
};
