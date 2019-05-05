export interface User {
  uid: string;
  email: string;
  provider: string;
  phoneNumber?: string;
  photoURL?: string;
  displayName?: string;
  admin?: boolean;
}
