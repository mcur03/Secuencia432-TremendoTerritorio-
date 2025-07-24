export interface StartLoginDto {
    pin: string;
}

export interface CompleteLoginDto {
    selectedImageId: number;
    pin: string;
}
