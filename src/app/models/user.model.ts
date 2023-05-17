export default interface User {
  id?: string;
  username: string;
  password: string;
  confirmPassword?: string;
  avatar_url?: string;
}
