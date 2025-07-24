// export interface ApiResponseModel {
//   success: boolean;
//   message: string;
//   data: any;
//   error: string | null;
//   otp?: string; // Optional field for OTP
// }
export interface ApiResponseModel {
  success: boolean;
  message: string;
  token?: string;
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  freeTrial?: boolean;
  error?: any;
  otp?:string
   data: any;
}
