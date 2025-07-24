
export interface RegisterDto {
  nombre: string;
  email: string;
  cedula: string;
  selectedImageId: number;
  rol: 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador';
}
