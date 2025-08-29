
export interface RegisterDto {
  first_name: string;
  last_name: string;
  email: string;
  id_number: string;
  user_phone: string;
  selectedImageId: number;
  userRole: 'campesino' | 'restaurante' | 'usuariofinal' | 'administrador';
}
