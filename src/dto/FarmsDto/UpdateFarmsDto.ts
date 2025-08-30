class UpdateFarmDto {
    
    private _id: string;
    private _farmName : string;
    private _location?: string;
    private _description?: string;
    

    constructor(
        id:string, farmName : string, location: string,
        description: string,
    ) {
        this._id = id;
        this._farmName = farmName;
        this._location = location;
        this._description = description;
    }

    // Getters
    get id(): string {
        return this._id;
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
    set id(id:string){
        this._id = id;
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

export default UpdateFarmDto;