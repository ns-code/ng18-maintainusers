interface IUser {
    id: number  | null;
    name: string;
}

export class User implements IUser {
    constructor(public id: number | null, public name: string) {
        this.id = id;
        this.name = name;
    }
}