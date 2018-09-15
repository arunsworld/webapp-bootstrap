import { Component, ViewChild } from '@angular/core';
import { DataTable, DataTablesComponent, DataTableRow } from '../../../library/src/public_api';


@Component({
    template: `
        <ab-datatable [data]="data" [classes]="'table-bordered table-hover table-sm'"
        (rowClicked)="rowClicked($event)" #dataTable></ab-datatable>
    `,
    styles: []
})
export class DemoDataTableComponent {

    data: DataTable;

    @ViewChild('dataTable') dataTable: DataTablesComponent;

    constructor() {
        this.data = {
            columns: [
                {id: 'col1', title: 'Col 1',
                    render: (data, type, row, meta) => {
                        if (type === 'display') { return '$' + data; }
                        return data;
                    }
                },
                {id: 'col2', title: 'Col 2'}
            ],
            rows: [
                {col1: 'Text 1', col2: 'Text 2'},
                {col1: 'Text 1.5', col2: 'Text 2.5'}
            ],
            options: {
                lengthMenu: [ [5, 10, -1], [5, 10, 'Everything'] ]
            },
        };

        setTimeout(() => {
            this.data.rows.push(
                {col1: 'Text 3.5', col2: 'Text 4', col3: 'ABC'},
                {col1: 'Text 3', col2: 'Text 4'},
                {col1: 'Text 3', col2: 'Text 4'},
                {col1: 'Text 3', col2: 'Text 4'},
                {col1: 'Text 3', col2: 'Text 4'},
                {col1: 'Text 3', col2: 'Text 4'}
            );
            this.dataTable.redraw(this.data.rows);
        }, 1000);
        setTimeout(() => {
            this.data.columns.push(
                {id: 'col3', title: 'Col 3'}
            );
            this.data.rows = [
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'},
                {col1: 'Text 1', col2: 'Text 2', col3: 'Text 3'},
                {col1: 'Text 1.5', col2: 'Text 2.5', col3: 'Text 3'}
            ];
            this.dataTable.recreate(this.data);
        }, 4000);
    }

    rowClicked(e: DataTableRow) {
        // console.log(e);
        alert(JSON.stringify(e));
    }

}
