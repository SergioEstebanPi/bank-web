import { Reporte } from './reporte';

export class ReportePage {
    content: Array<Reporte>;
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