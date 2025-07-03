class Images{
    private _id: number;
    private _cloudinary_url: string;

    constructor(id: number, cloudinary_url: string) {
        this._id = id;
        this._cloudinary_url = cloudinary_url;
    }

    // getters
    get id(): number {
        return this._id;
    }
    get cloudinary_url(): string {
        return this._cloudinary_url;
    }

    // setters
    set id(id: number) {
        this._id = id;
    }
    set cloudinary_url(cloudinary_url: string) {
        this._cloudinary_url = cloudinary_url;
    }
}

export default Images;