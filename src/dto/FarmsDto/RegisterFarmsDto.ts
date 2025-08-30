export class RegisterFarmDto {
    
    private _userId: string;
    private _farmName : string;
    private _location?: string;
    private _description?: string;
    

    constructor(
        userId:string, farmName : string, location: string,
        description: string,
    ) {
        this._userId = userId;
        this._farmName = farmName;
        this._location = location;
        this._description = description;
    }

    // Getters
    get userId(): string {
        return this._userId;
    }
    get farmName(): string {
        return this._farmName;
    }
    get location(): string | undefined {
        return this._location;
    }
    get description(): string | undefined {
        return this._description;
    }
    // Setters
    set userId(userId:string){
        this._userId = userId;
    }
    set farmName(farmName: string) {
        this._farmName = farmName;
    }
    set location(location: string | undefined) {
        this._location = location;
    }
    set description(description: string | undefined) {
        this._description = description;
    }
};
