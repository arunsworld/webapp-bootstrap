import { Component, ViewChild, ElementRef, OnInit, Input, AfterViewInit, ChangeDetectorRef, Output,
    EventEmitter } from '@angular/core';

declare var $: any;

@Component({
    selector: 'ab-datatable',
    template: `
        <table class="table" [ngClass]="classes" #dataTable>
        </table>
    `,
    styles: []
})
export class DataTablesComponent implements AfterViewInit {

    @Input() data: DataTable;
    @Input() classes: string | Array<string>;
    @Output() rowClicked = new EventEmitter<DataTableRow>();
    @ViewChild('dataTable') dataTableElement: ElementRef;

    private dataTable: any; // jquery object used by datatables.net
    private dataTable_api: any;

    constructor(private cdr: ChangeDetectorRef) { }

    private static columnOptions(columns: Array<DataTableColumn>) {
        return columns.map( (column: DataTableColumn) => {
            return {data: column.id, name: column.id, title: column.title};
        });
    }

    private static columnDefn(column: DataTableColumn, idx: number) {
        const columnDefn: DataTableColumnDef = {targets: idx};
        if ('visible' in column) { columnDefn.visible = column.visible; }
        if ('cellType' in column) { columnDefn.cellType = column.cellType; }
        if ('render' in column) { columnDefn.render = column.render; }
        if ('defaultContent' in column) { columnDefn.defaultContent = column.defaultContent; }
        return columnDefn;
    }

    private static columnDefnOptions(columns: Array<DataTableColumn>) {
        const options = columns.map( (column: DataTableColumn, idx: number) =>
            DataTablesComponent.columnDefn(column, idx) );
        return {columnDefs: options};
    }

    ngAfterViewInit(): void {
        this.dataTable = $(this.dataTableElement.nativeElement);
        this.setupDataTable();
        this.setupOnClick();
        this.cdr.detach();
    }

    // Call this to dedraw the enter table - header and all
    recreate(d: DataTable): void {
        this.data = d;
        this.dataTable_api.destroy();
        this.dataTable.html('');
        this.setupDataTable();
        this.setupOnClick();
    }

    // Call this to redraw with new data (no change to header etc.)
    redraw(d: Array<DataTableRow>): void {
        this.data.rows = d;
        this.dataTable_api.clear();
        this.dataTable_api.rows.add(d);
        this.dataTable_api.draw();
    }

    private setupDataTable() {
        const options = {
            data: this.data.rows,
            columns: DataTablesComponent.columnOptions(this.data.columns)
        };
        Object.assign(options, this.additionalOptions());
        Object.assign(options, DataTablesComponent.columnDefnOptions(this.data.columns));
        this.dataTable = this.dataTable.dataTable(options);
        this.dataTable_api = this.dataTable.api();
    }

    private setupOnClick() {
        const tbody = this.dataTable.children('tbody');
        tbody.on('click', 'tr', (e) => {
            const row = e.currentTarget;
            const dataTableRow = this.dataTable.api().row(row).data();
            this.rowClicked.emit(dataTableRow);
        });
    }

    private additionalOptions() {
        if (!('options' in this.data)) { return {}; }
        return this.data.options;
    }

}


export interface DataTableColumn {
    id: string;
    title: string;
    visible?: boolean;
    cellType?: string; // example: set this to th
    /*
    use this to alter the value used for type = display | type | sort | filter
    response can be a data element or even HTML
    */
   render?: (data, type, row, meta) => any;
   defaultContent?: string;
}

export interface DataTableRow {
    [id: string]: string | number;
}

export interface DataTableColumnDef {
    targets: number | Array<number>;
    visible?: boolean;
    cellType?: string; // example: set this to th
    /*
    use this to alter the value used for type = display | type | sort | filter
    response can be a data element or even HTML
    */
    render?: (data, type, row, meta) => any;
    defaultContent?: string;
}

export interface DataTableOptions {
    lengthMenu?: Array<any>; // [ 10, 25, 50, 75, 100 ] OR [ [10, 25, 50, -1], [10, 25, 50, "All"] ]
}

export interface DataTable {
    columns: Array<DataTableColumn>;
    rows: Array<DataTableRow>;
    options?: DataTableOptions;
}
