export interface StartLoginDto {
    username: string;
}

export interface CompleteLoginDto {
    username: string;
    selectedImageId: number;
    pin: string;
}
