import 'anychart';
declare var anychart: any
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/service/api.service';

@Component({
  selector: 'app-new-tab',
  templateUrl: './new-tab.component.html',
  styleUrls: ['./new-tab.component.css'],
})
export class NewTabComponent implements OnInit {

  selectedFile: File | null = null;
  columnHeader: any = [ "Customer Feedback", "Sentiment", "Focus Area"];
  rowData: any [] = [];

  chart= anychart.map();
  isLoading: boolean = false;
  dataReceived: boolean = false;

  pieChartData: any[] = [];
  sentimentTableData: any[] = [];
  lineChartData: any[] = [];
  columnChartData: any[] = [];
  totalSize: number = 0;
  totalPos: number = 0;
  totalNeg: number = 0;
  totalNeu: number = 0;
  bestFocusArea: string = '';
  poorFocusArea: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  createDoughnutChart(data: any[]) {
    if (!document.getElementById('doughnutChart')) {
      console.error('Container not found');
      return;
    }
  
    const chart = anychart.pie(data);
    chart.innerRadius("30%");
    chart.title('Sentiment Distribution');
    chart.container("doughnutChart");
    chart.draw();
  }

  createLineChart(data: any[]) {
    if (!document.getElementById('lineChart')) {
      console.error('Container not found');
      return;
    }
  
    // Create a data set from the passed data
    const chartData = anychart.data.set(data);
  
    // Map the data
    const seriesData_1 = chartData.mapAs({ x: 0, value: 1 }); // Assuming this is "positive"
    const seriesData_2 = chartData.mapAs({ x: 0, value: 2 }); // Assuming this is "negative"
  
    // Create the line chart
    const chart = anychart.line();
  
    // Set chart title
    chart.title('Sentiment Trend');
  
    // Enable and configure the legend
    chart.legend(true);
    chart.legend().position('top');
    chart.legend().itemsLayout('horizontal-expandable');
  
    // Set the interactivity mode
    chart.interactivity().hoverMode('single');
  
    // Create the first series for "positive" sentiment
    const series1 = chart.line(seriesData_1);
    series1.name('Positive');
    series1.normal().stroke('#00cc99', 2); // Solid green line with thickness 2
    series1.markers()
        .enabled(true)  // Enable markers
        .type('circle') // Set marker type to circle
        .size(4)        // Set marker size
        .fill('#00cc99') // Set marker color to green
        .stroke(null);  // No border stroke for markers

    // Create the second series for "negative" sentiment
    const series2 = chart.line(seriesData_2);
    series2.name('Negative');
    series2.normal().stroke('#cc3300', 2); // Solid red line with thickness 2
    series2.markers()
        .enabled(true)  // Enable markers
        .type('circle') // Set marker type to circle
        .size(4)        // Set marker size
        .fill('#cc3300') // Set marker color to red
        .stroke(null);  // No border stroke for markers
  
    // Set the titles of the axes
    chart.xAxis().title('Month');
    chart.yAxis().title('Frequency of Sentiments');
  
    // Set the container id
    chart.container('lineChart');
  
    // Initiate drawing the chart
    chart.draw();
  }
  

  createColumnChart(data: any[]) {
    if (!document.getElementById('columnChart')) {
      console.error('Container not found');
      return;
    }

    // Create a data set
    const dataSet = anychart.data.set(data);

    // Map the data
    const seriesData_1 = dataSet.mapAs({ x: 0, value: 1 });
    const seriesData_2 = dataSet.mapAs({ x: 0, value: 2 });
    const seriesData_3 = dataSet.mapAs({ x: 0, value: 3 });
    const seriesData_4 = dataSet.mapAs({ x: 0, value: 4 });

    // Create a column chart
    const chart = anychart.column();

    // Create the series and set data
    chart.column(seriesData_1).name("Connectivity");
    chart.column(seriesData_2).name("Speed & Stability");
    chart.column(seriesData_3).name("Coverage");
    chart.column(seriesData_4).name("Customer Solution");

    // Configure the legend
    chart.legend(true);
    chart.legend().position('top');
    chart.legend().itemsLayout('horizontal-expandable');

    chart.barsPadding(0);
    chart.barGroupsPadding(1.5);
    chart.title("Focus Area Distribution");
    chart.xAxis().title("Sentiment");
    chart.yAxis().title("Number of Reviews");
    chart.container("columnChart");
    chart.draw();

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
        this.columnChartData = response.columnChart;
        this.totalSize = response.totalSize;
        this.totalPos = response.totalPos;
        this.totalNeg = response.totalNeg;
        this.totalNeu = response.totalNeu;
        this.bestFocusArea = response.bestFocusArea;
        this.poorFocusArea = response.poorFocusArea;
        this.dataReceived = true;

        console.log(response);
  
        this.isLoading = false;
  
        // Ensure that the DOM has the container before rendering the chart
        setTimeout(() => {
          this.createDoughnutChart(this.pieChartData);
          this.createLineChart(this.lineChartData);
          this.createColumnChart(this.columnChartData);
        }, 0);
      });
    }
  }
  

}
