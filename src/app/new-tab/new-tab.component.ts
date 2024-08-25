import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.css']
})
export class NewTabComponent implements OnInit {

  selectedFile: File | null = null;
  columnHeader: any = [ "First Name", "Last Name", "Course" ];
  rowData: any [] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getStudentData().subscribe((response) => {
      this.rowData = response;
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.apiService.uploadFile(formData)
    }
  }

}
