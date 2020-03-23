import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClientService {
  private apiUrl = 'http://localhost:3000/api/clients';

  constructor(private http: HttpClient){ }

  getClients(){
    return this.http.get(`${this.apiUrl}`)
  }

  saveClient(client){
    return this.http.post(`${this.apiUrl}`, client);
  }

  updateClient(client){
    return this.http.put(`${this.apiUrl}/${client._id}`, client);
  }

  deleteClient(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
