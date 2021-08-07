export class UserAccount{
  name: string;
  username: string;
  email: string;
  avatar: string;
  roles: any;
  constructor(name: string, username: string, email: string, avatar: string, roles: any) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.roles = roles;
  }
}
