export interface IPerspective {
    id: string;
    name: string;
    author: string;
    mapwork: string;
    children?: IPerspective[];
}

