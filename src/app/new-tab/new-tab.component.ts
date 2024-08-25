import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.css']
})
export class NewTabComponent implements OnInit {

  columnHeader: any = [ "First Name", "Last Name", "Course" ];
  rowData: any [] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getStudentData().subscribe((response) => {
      this.rowData = response;
    })
  }

}
