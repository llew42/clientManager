import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'clients',
  templateUrl: './clients.component.html',
})

export class ClientsComponent implements OnInit {
  clients;
  _id;
  firstName;
  lastName;
  email;
  phone;
  isEdit;
  constructor(private clientService: ClientService){ }

  ngOnInit(){
    this.isEdit = false,
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe(clients => {
     this.clients = clients;
    });
  }

  onAddSubmit(){
    console.log('Submit clicked')
    const newClient = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone
    }
    this.clientService.saveClient(newClient).subscribe(client => {
      this.clients.push(client);
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phone = '';
    });
  }

  onEditSubmit(){
    const updateClient = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      _id: this._id
    }

    this.clientService.updateClient(updateClient).subscribe(client => {
      console.log("The client is ", client);
      for (let i = 0; i < this.clients.length; i++) {
        if (updateClient._id === this.clients[i]._id) {
          this.clients.splice(i, 1);
        }
      }
      this.clients.push(client);
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phone = '';
    });
  }

  onEdit(client){
    this.isEdit = true;
    this.firstName = client.firstName;
    this.lastName = client.lastName;
    this.email = client.email;
    this.phone = client.phone;
    this._id = client._id;
  }

  onDelete(id){
    this.clientService.deleteClient(id).subscribe(client => {
      for (let i = 0; i < this.clients.length; i ++) {
        if (id === this.clients[i]._id){
          this.clients.splice(i, 1);
        }
      }
    })
  }
}
