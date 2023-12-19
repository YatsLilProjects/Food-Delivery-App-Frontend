import { CustomerAddress } from "./CustomerAddress";
import { SignUp } from "./SignUp";


export class Customer {
  customerId:number;
  customerName: string;
  customerContactNo: string;
  customerEmailId: string;
  customerAddress: CustomerAddress;
  signUp: SignUp;
  userType:string;
}