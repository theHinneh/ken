import {Component, OnInit, ViewChild} from '@angular/core';
import {Student} from '../student';
import {CustomerService} from '../customerservice';
import {Table} from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  customers: Student[];
  cols: any[];
  exportColumns: any[];


  statuses: any[];

  loading = true;

  @ViewChild('dt') table: Table;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;
    });

    this.statuses = [
      {label: 'Premium', value: 'premium'},
      {label: 'Standard', value: 'Standard'},
      {label: 'Regular', value: 'regular'},
    ];

    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'date', header: 'Date'},
      {field: 'status', header: 'Status'},
      {field: 'payment', header: 'Payment'},
      {field: 'amount', header: 'Amount'}
    ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  onActivityChange(event): void {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value, 10);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value): void {
    this.table.filter(this.formatDate(value), 'date', 'equals');
  }

  formatDate(date): any {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event): void {
    this.table.filter(event.value, 'representative', 'in');
  }

  // exportPdf(): void {
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then((x) => {
  //       const doc = new jsPDF.default('p', 'cm');
  //       doc.table(0, 0, this.exportColumns, this.customers);
  //       doc.autoPrint({variant: 'javascript'});
  //       doc.save('products.pdf');
  //     });
  //   });
  // }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.customers);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'customers');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      const EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}
