import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClientService {

  httpOptions = {
    header: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient){

  }

  getClients(){
    return this.http.get('http://localhost:3000/api/clients')
  }
}
