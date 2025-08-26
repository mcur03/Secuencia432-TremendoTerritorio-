
export interface RegisterDto {
  nombre: string;
  apellido: string;
  email: string;
  cedula: string;
  telefono: string;
  selectedImageId: number;
  rol: 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador';
}
