import {page} from "./page";
export class User extends page {
  private id: number;
   userName: String;
   email: String;
   realName: String;
   mobile: String;
   password: String;
   passwords: Passwords;


}

export class Passwords {
   password: String;
   repeatPassword: String;


}
