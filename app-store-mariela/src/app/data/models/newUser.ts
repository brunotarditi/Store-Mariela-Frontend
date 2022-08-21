export class NewUser {
    userName: string;
    password: string;
    role: string;

    constructor(userName: string, password: string, role: string){
        this.userName = userName;
        this.password = password;
        this.role = role;
    }
}