import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TestTableDataSource, TestTableItem } from './test-table-datasource';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TestTableItem>;
  dataSource: TestTableDataSource;


  elements = [
    {name: 'write',date:"10/01/2021", icon: '../assets/img/writer-icon.svg', comment:'Nous écrire un message',method:"openDialogWrite()"},
    {name: 'record',date:"10/01/2021", icon: '../assets/img/voice-recorder-icon.svg', comment:'Enregistrer un message audio',method:"openDialogWrite()"},
    {name: 'file',date:"10/01/2021", icon: '../assets/img/send-audio-icon.svg', comment:'Nous envoyer un fichier',method:"openDialogWrite()"},
    {name: 'playlist',date:"10/01/2021", icon: '../assets/img/jukebox-icon.svg', comment:'Ecouter les pistes des autres utilisateurs',method:"openDialogWrite()"},
  
    ];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new TestTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
