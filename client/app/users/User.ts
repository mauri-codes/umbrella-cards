export class User {
  username:     string;
  role:         string;
  email:        string;
  password:     string;
  displayName:  string;
  createdAt:    string;
  validated:    string;
  constructor(username: string, email: string, password: string){
    this.username   = username;
    this.email      = email;
    this.password   = password;
  }
}
