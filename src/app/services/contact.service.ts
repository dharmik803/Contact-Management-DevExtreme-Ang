import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // contact!: Contact[];
  

  constructor(private http: HttpClient) { }

  getContactList(): Observable<Contact[]>{
    return this.http.get<Contact[]>('http://localhost:3000/contact');
  }

  addContact(contactIp: Contact){
    return this.http.post('http://localhost:3000/contact', contactIp);
  }

  updateContact(contactIp: Contact){
    return this.http.put<Contact>(`http://localhost:3000/contact/${contactIp.id}`, contactIp);
  }

  deleteContact(contactId: number){
    return this.http.delete(`http://localhost:3000/contact/${contactId}`);
  }
}
