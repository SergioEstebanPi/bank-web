import { Cliente } from './cliente';

export class ClientePage {
    content: Array<Cliente>;
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