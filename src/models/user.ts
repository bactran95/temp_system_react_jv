export interface User {
  email: string;
  id: number;
  phone_number: string;
  avatar_file?: string;
  address?: string;
  note?: string;
  locked?: boolean;
}
