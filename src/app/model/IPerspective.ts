export interface IPerspective {
    id: string;
    name: string;
    author: string;
    children?: IPerspective[];
}

