export class User {
    constructor(
        public username: string,
        public token?: string,
    ) { }

    public get_username() {
        return this.username;
    }
    public get_token() {
        return this.token;
    }
}

export enum Role {
    QA = "QA",
    Admin = "ADMIN",
    Monitor="MONITOR"
}