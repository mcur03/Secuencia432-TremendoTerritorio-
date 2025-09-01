export class IdFarmDto {
    
    private _idFarm: number;
    

    constructor(
        idFarm:number
    ) {
        this._idFarm = idFarm;
    }

    // Getters
    get idFarm(): number {
        return this._idFarm;
    }
    // Setters
    set idFarm(idFarm:number){
        this._idFarm = idFarm;
    }
};
