import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

    // Example GET method
    getStudentData(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/students/list`);
    }
  
    // Example POST method
    postData(data: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/students/create`, data);
    }
    
    uploadFile(file: any): Observable<any>{
      return this.http.post(`${this.baseUrl}/file-manager/upload`, file)
        .pipe(
          timeout(600000)) // Timeout
    }
}
