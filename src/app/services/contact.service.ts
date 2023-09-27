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

  addContact(contactIp: Contact): Observable<Contact>{
    return this.http.post<Contact>('http://localhost:3000/contact', contactIp);
  }

  updateContact(contactIp: Contact): Observable<Contact>{
    return this.http.put<Contact>(`http://localhost:3000/contact/${contactIp.id}`, contactIp);
  }

  deleteContact(contactId: number) :Observable<Contact>{
    return this.http.delete<Contact>(`http://localhost:3000/contact/${contactId}`);
  }
}
