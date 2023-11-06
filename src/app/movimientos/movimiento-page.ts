import { Movimiento } from './movimiento';

export class MovimientoPage {
    content: Array<Movimiento>;
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