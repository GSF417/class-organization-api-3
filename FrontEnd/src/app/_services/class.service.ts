import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { curricular_unit } from '../class.model';

const API_URL = 'https://localhost:7275';
const httpOptions = {
  headers: new HttpHeaders({ ContentType: 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ClassService {
    constructor(private http: HttpClient) {}
      getAllCUnits(): Observable<curricular_unit[]> {  
        return this.http.get<curricular_unit[]>(API_URL + '/AllCUnitDetails');  
      }  
      getCUnitById(cunitId: string): Observable<curricular_unit> {  
        return this.http.get<curricular_unit>(API_URL + '/GetCUnitDetailsById/' + cunitId);  
      }  
      createCUnit(cunit: curricular_unit): Observable<curricular_unit> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.post<curricular_unit>(API_URL + '/InsertCUnitDetails/',  
        cunit, httpOptions);  
      }  
      updateCUnit(cunit: curricular_unit): Observable<curricular_unit> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.put<curricular_unit>(API_URL + '/UpdateCUnitDetails/',  
        cunit, httpOptions);  
      }  
      deleteCUnitById(cunit: string): Observable<number> {  
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.delete<number>(API_URL + '/DeleteCUnitDetails?id=' +cunit,  
     httpOptions);  
      }  
}