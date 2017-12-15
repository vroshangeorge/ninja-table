(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['ninja-table'] = {}),global.core,global.common));
}(this, (function (exports,core,common) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NinjaTableComponent = (function () {
    function NinjaTableComponent() {
        this.fetchData = new core.EventEmitter();
        this.pagination = {};
        this.ddl = [{ Key: 1, Value: '10' }, { Key: 2, Value: '20' }, { Key: 3, Value: '50' }];
        this.headerRows = [];
        this.dataRows = [];
        // Build range to show in pagination buttons
        this.range = [];
    }
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.initPager = /**
     * @return {?}
     */
    function () {
        this.perPageCount = this.ddl[0].Key;
        this.pagination.totalPages = this.config.totalPages || 0;
        this.pagination.totalRecords = this.config.totalRecords || 0;
        this.pagination.page = this.config.page || 1;
        this.pagination.perPage = this.config.perPage || 0;
        this.pagination.dataChannel = this.config.dataChannel || null;
        this.pagination.range = { limit: 10, start: 0, end: 0 };
        this.pagination.searchCriteria = this.config.searchCriteria || '';
        this.pagination.sortConfig = this.config.sortConfig;
        this.headerRows = this.config.headRows;
        this.dataRows = this.config.dataRows;
        this.pagination.from = '';
        this.pagination.to = '';
        this.pagination.total = '';
        this.pagination.totalPages = Math.ceil(this.config.totalRecords / this.config.perPage) || 0;
        this.generateLabel();
        this.calculateRange();
        this.buildRange();
    };
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initPager();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NinjaTableComponent.prototype.changePerPage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        debugger;
        switch (Number(index)) {
            case 1:
                this.pagination.perPage = 10;
                break;
            case 2:
                this.pagination.perPage = 20;
                break;
            case 3:
                this.pagination.perPage = 50;
                break;
            default:
                this.pagination.perPage = 10;
                break;
        }
        this.pagination = Object.assign({}, this.pagination);
        this.fetchData.emit(this.pagination);
    };
    // Generate label - In the end, it will look like 'Showing 1 - 10 of 100 records
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.generateLabel = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ start = (this.pagination.page - 1) * this.pagination.perPage + 1, /** @type {?} */
        end = start + this.pagination.perPage - 1;
        end > this.pagination.totalRecords && (end = this.pagination.totalRecords);
        this.pagination.from = start;
        this.pagination.to = end;
        this.pagination.total = this.pagination.totalRecords;
    };
    // Navigate to a particular page
    /**
     * @param {?} page
     * @return {?}
     */
    NinjaTableComponent.prototype.gotoPage = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        debugger;
        this.pagination.page = page;
        this.pagination = Object.assign({}, this.pagination);
        this.fetchData.emit(this.pagination);
    };
    // Navigate to next page
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.gotoNext = /**
     * @return {?}
     */
    function () {
        if (this.pagination.page + 1 <= this.pagination.totalPages) {
            this.pagination.page = this.pagination.page + 1;
            this.fetchData.emit(this.pagination);
        }
    };
    // Navigate to previous page
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.gotoPrevious = /**
     * @return {?}
     */
    function () {
        if (this.pagination.page - 1 > 0) {
            this.pagination.page = this.pagination.page - 1;
            this.fetchData.emit(this.pagination);
        }
    };
    // Navigate to first page
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.gotoFirst = /**
     * @return {?}
     */
    function () {
        this.pagination.page = 1;
        this.fetchData.emit(this.pagination);
    };
    // Navigate to last page
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.gotoLast = /**
     * @return {?}
     */
    function () {
        this.pagination.page = Math.ceil(this.pagination.totalRecords / this.pagination.perPage);
        this.fetchData.emit(this.pagination);
    };
    // Find the start and end of pagination
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.calculateRange = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ start = this.pagination.page - (this.pagination.range.limit / 2), /** @type {?} */
        end = this.pagination.page + (this.pagination.range.limit / 2);
        if (start <= 0) {
            start = 1;
            end += 0 - start;
        }
        if (end > this.pagination.totalPages) {
            start -= end - this.pagination.totalPages;
            start <= 0 && (start = 1);
            end = this.pagination.totalPages;
        }
        this.pagination.range.start = start;
        this.pagination.range.end = end;
    };
    // Fetch records based on the pagination config
    /**
     * @param {?} config
     * @return {?}
     */
    NinjaTableComponent.prototype.fetchRecords = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.pagination.dataChannel(this.pagination).success(function (response) {
            this.records = response.Rows;
            this.pagination.totalRecords = response.Records;
            this.pagination.totalPages = Math.ceil(this.pagination.totalRecords / this.pagination.perPage);
            this.pagination.page = response.Page;
            this.generateLabel();
            this.calculateRange();
            this.buildRange();
        });
    };
    /**
     * @return {?}
     */
    NinjaTableComponent.prototype.buildRange = /**
     * @return {?}
     */
    function () {
        this.range = [];
        for (var /** @type {?} */ i = this.pagination.range.start; i <= this.pagination.range.end; i++) {
            this.range.push(i);
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NinjaTableComponent.prototype.generateArray = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        console.log(obj);
        return Object.keys(obj).map(function (key) { return { key: key, value: obj[key] }; });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NinjaTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["config"]) {
            this.initPager();
        }
    };
    NinjaTableComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ninja-table',
                    template: "<table class=\"table table-hover table-responsive\"> <thead> <tr> <th *ngFor=\"let head of headerRows\"> <a href=\"#\" click-to-sort> {{head.value}} <!--<span show-if-desc class=\"fa fa-caret-down\"></span> <span show-if-asc class=\"fa fa-caret-up\"></span>--> </a> </th> </tr> </thead> <tbody> <!--no data found tr--> <tr *ngIf=\"pagination.totalRecords==0\"> <td class=\"text-align-center\"> <h1 class=\"no-data-txt\"><i class=\"fa fa-file-text\" aria-hidden=\"true\"></i> No data found</h1></td> </tr> <tr *ngFor=\"let data of dataRows\"> <td *ngFor=\"let head of headerRows\"> <span *ngFor=\"let col of generateArray(data)\"> <span *ngIf=\"col.key == head.key\">{{col.value}} </span> <!--<b class=\"table_bold\">{{col.value}}</b>--> </span> </td> </tr> </tbody> </table> <br/> <div *ngIf=\"pagination.totalRecords>0\"> <div class=\"col-md-6\"> Showing <span class=\"txt-color-darken\">{{pagination.from}}</span> to <span class=\"txt-color-darken\">{{pagination.to}}</span> of <span class=\"text-primary\">{{pagination.total}}</span> entries <span class=\"smart-select smart_select_small icon\"> <select [(ngModel)]=\"perPageCount\" (change)=\"changePerPage(perPageCount)\"> <option *ngFor=\"let option of ddl\" value=\"{{option.Key}}\"> {{ option.Value }} </option> </select> </span> </div> <div class=\"col-md-6\"> <nav aria-label=\"Page navigation example\"> <ul class=\"pagination\"> <li class=\"page-item\" [ngClass]=\"{disabled: pagination.page <= 1}\"> <a class=\"page-link\" href=\"#\" aria-label=\"First\"> <span aria-hidden=\"true\">&laquo;</span> <span class=\"sr-only\">First</span> </a> </li> <li class=\"page-item\"> <a class=\"page-link\" href=\"#\" aria-label=\"Previous\" [ngClass]=\"{disabled: pagination.page <= 1}\"> <span aria-hidden=\"true\">&lsaquo;</span> <span class=\"sr-only\">Previous</span> </a> </li> <li *ngFor=\"let pp of range\" [ngClass]=\"{active: pp == pagination.page}\" class=\"page-item\"> <a class=\"page-link\"  (click)=\"gotoPage(pp)\" href=\"javascript: void(0)\">{{pp}}</a> </li> <li class=\"page-item\" [ngClass]=\"{disabled: pagination.page == pagination.totalPages}\"> <a class=\"page-link\" href=\"#\" aria-label=\"Next\"> <span aria-hidden=\"true\">&rsaquo;</span> <span class=\"sr-only\">Next</span> </a> </li> <li class=\"page-item\" [ngClass]=\"{disabled: pagination.page == pagination.totalPages}\"> <a class=\"page-link\" href=\"#\" aria-label=\"Last\"> <span aria-hidden=\"true\">&raquo;</span> <span class=\"sr-only\">Last</span> </a> </li> </ul> </nav> </div> </div> <!-- working table <table class=\"table table-hover dataTable table-striped width-full table-bordered\"> <thead> <tr> <th *ngFor=\"let head of headerRows\"> {{head.value}} </th> </tr> </thead> <tbody> <tr *ngFor=\"let data of dataRows\"> <td *ngFor=\"let head of headerRows\">        <span *ngFor=\"let col of generateArray(data)\"> <span *ngIf=\"col.key == head.key\">{{col.value}} </span> </span> </td> </tr> </tbody> </table> <br/> <div class=\"dt-toolbar-footer\" *ngIf=\"pagination.totalRecords>0\"> <div class=\"col-xs-6\"> <div class=\"rx dataTables_info\" id=\"datatable_fixed_column_info\" role=\"status\" aria-live=\"polite\"> Showing <span class=\"txt-color-darken\">{{pagination.from}}</span> to <span class=\"txt-color-darken\">{{pagination.to}}</span> of <span class=\"text-primary\">{{pagination.total}}</span> entries <span class=\"smart-select smart_select_small icon\"> <select [(ngModel)]=\"perPageCount\" (change)=\"changePerPage(perPageCount)\"> <option *ngFor=\"let option of ddl\" value=\"{{option.Key}}\"> {{ option.Value }} </option> </select> </span> </div> </div><div class=\"col-xs-6\"> <div class=\"dataTables_paginate paging_simple_numbers\" id=\"datatable_fixed_column_paginate\"> <ul class=\"pagination pagination-sm\"> <li [ngClass]=\"{disabled: pagination.page <= 1}\"> <a href=\"javascript: void(0)\" (click)=\"gotoFirst()\"><span>&laquo;</span></a> </li> <li [ngClass]=\"{disabled: pagination.page <= 1}\"> <a href=\"javascript: void(0)\" (click)=\"gotoPrevious()\"><span>&lsaquo;</span></a> </li> <li *ngFor=\"let pp of range\" [ngClass]=\"{active: pp == pagination.page}\"> <a href=\"javascript: void(0)\" (click)=\"gotoPage(pp)\">{{pp}}</a> </li> <li [ngClass]=\"{disabled: pagination.page == pagination.totalPages}\"> <a href=\"javascript: void(0)\" (click)=\"gotoNext()\"><span>&rsaquo;</span></a> </li> <li [ngClass]=\"{disabled: pagination.page == pagination.totalPages}\"> <a href=\"javascript: void(0)\" (click)=\"gotoLast()\"><span>&raquo;</span></a> </li> </ul> </div> </div> </div> --> ",
                    styles: [""],
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    NinjaTableComponent.ctorParameters = function () { return []; };
    NinjaTableComponent.propDecorators = {
        "config": [{ type: core.Input },],
        "fetchData": [{ type: core.Output },],
    };
    return NinjaTableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var KeysPipe = (function () {
    function KeysPipe() {
    }
    /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    KeysPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    function (value, args) {
        var /** @type {?} */ keys = [];
        for (var /** @type {?} */ key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    KeysPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'keys' },] },
    ];
    /** @nocollapse */
    KeysPipe.ctorParameters = function () { return []; };
    return KeysPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NinjaTableModule = (function () {
    function NinjaTableModule() {
    }
    /**
     * @return {?}
     */
    NinjaTableModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NinjaTableModule,
            providers: []
        };
    };
    NinjaTableModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        NinjaTableComponent,
                        KeysPipe
                    ],
                    exports: [
                        NinjaTableComponent,
                        KeysPipe
                    ]
                },] },
    ];
    /** @nocollapse */
    NinjaTableModule.ctorParameters = function () { return []; };
    return NinjaTableModule;
}());

exports.NinjaTableModule = NinjaTableModule;
exports.NinjaTableComponent = NinjaTableComponent;
exports.KeysPipe = KeysPipe;

Object.defineProperty(exports, '__esModule', { value: true });

})));
