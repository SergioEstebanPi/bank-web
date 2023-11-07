import { Cuenta } from './cuenta';

export class CuentaPage {
    content: Array<Cuenta>;
    pageable: string;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}