export class User {
  username: string;
  role: string;
  email: string;
  password: string;
  displayName: string;
  constructor(us: string, rl: string, el: string){
    this.username = us;
    this.role     = rl;
    this.email    = el;
  }
}
