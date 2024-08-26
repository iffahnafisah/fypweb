import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.css']
})
export class NewTabComponent implements OnInit {

  selectedFile: File | null = null;
  columnHeader: any = [ "Clean Text", "Sentiment"];
  rowData: any [] = [];

  isLoading: boolean = false;

  pieChartData: any[] = [];
  sentimentTableData: any[] = [];
  lineChartData: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    this.isLoading = true;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.apiService.uploadFile(formData).subscribe((response) => {
        this.pieChartData = response.pieChart;
        this.sentimentTableData = response.sentimentTable;
        this.lineChartData = response.lineChart;

        console.log(this.pieChartData);
        console.log(this.lineChartData);
        this.isLoading = false;
      })
    }
  }

}
