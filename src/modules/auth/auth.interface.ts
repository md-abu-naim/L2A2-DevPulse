export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string | number,
    role: 'contributor' | 'maintainer'
}