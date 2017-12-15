import { OnInit, EventEmitter, SimpleChanges } from '@angular/core';
export declare class NinjaTableComponent implements OnInit {
    config: any;
    fetchData: EventEmitter<{}>;
    perPageCount: number;
    pagination: any;
    ddl: {
        Key: number;
        Value: string;
    }[];
    headerRows: any;
    dataRows: any;
    constructor();
    initPager(): void;
    ngOnInit(): void;
    changePerPage(index: number): void;
    generateLabel(): void;
    gotoPage(page: number): void;
    gotoNext(): void;
    gotoPrevious(): void;
    gotoFirst(): void;
    gotoLast(): void;
    calculateRange(): void;
    fetchRecords(config: any): void;
    range: any[];
    buildRange(): void;
    generateArray(obj: any): {
        key: string;
        value: any;
    }[];
    ngOnChanges(changes: SimpleChanges): void;
}
