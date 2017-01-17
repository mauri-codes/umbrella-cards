export class User {
  username: string;
  role: string;
  email: string;
  password: string;
  displayName: string;
  createdAt: string;
  validated: string;
  constructor(us: string, el: string, rl: string){
    this.username       = us;
    this.email          = el;
    this.password       = rl;
  }
}
