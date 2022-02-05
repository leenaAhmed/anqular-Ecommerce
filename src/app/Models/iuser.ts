export interface IUser {
  id: number;
  fullName: string;
  email: string;
  phone: number;
  address: {
    city: string;
    postalCode: string;
    street: string;
  };
  referral: string;
  referralOther: string;
  password: string;
  confirmPassword: string;
}
