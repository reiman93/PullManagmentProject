
export interface IRole {
    id?: number;
    name?: string;
    description?: any;
}
export interface IUser {
    id?: number;
    name?: string;
    username?: any;
    role: IRole,
    foto: any
}

export interface INomenclators {
    id?: number;
    name?: string;
    description?: any;
}


