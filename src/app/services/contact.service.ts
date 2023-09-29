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
    return this.http.get<Contact[]>('https://localhost:7219/api/Contacts');
  }

  addContact(contactIp: Contact): Observable<Contact>{
    return this.http.post<Contact>('https://localhost:7219/api/Contacts', contactIp);
  }

  updateContact(contactIp: Contact): Observable<Contact>{
    return this.http.put<Contact>(`https://localhost:7219/api/Contacts/${contactIp.contactId}`, contactIp);
  }

  deleteContact(contactId: number) :Observable<Contact>{
    return this.http.delete<Contact>(`https://localhost:7219/api/Contacts/${contactId}`);
  }
}
