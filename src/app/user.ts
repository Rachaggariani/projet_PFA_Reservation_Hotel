import { Role } from "./role";

export interface User {
  id: number;
  username: string;
  role: Role;
  // Add other user properties as needed
}