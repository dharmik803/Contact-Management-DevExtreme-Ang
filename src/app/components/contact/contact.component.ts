import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactList: Contact[] = [];
  updatedData!: Contact;
  addedData!: Contact;
  deletedData!: Contact[];

  @ViewChild(DxDataGridComponent)
  dataGrid!: DxDataGridComponent;

  constructor(private serv: ContactService) {}

  // OnInit
  ngOnInit(): void {
    this.serv.getContactList().subscribe((data) => {
      this.contactList = data;
    });

    this.selectContact = this.selectContact.bind(this);
  }

  // ID Generation when popup is opened
  onInitNewRow(event: any) {
    event.data.id = this.contactList[this.contactList.length - 1].id + 1;
    console.log(event.data);
  }

  // Add row data function
  onAddRow(event: any) {
    this.addedData = {
      id: event.data.id,
      name: event.data.name,
      email: event.data.email,
      phoneNumber: event.data.phoneNumber,
    };

    this.serv.addContact(this.addedData).subscribe((res) => {
      console.log(res);
    });
  }

  // Edit row data function
  onEditRow(event: any) {
    const tempData = this.contactList.find((data) => data.id === event.data.id);
    this.updatedData = {
      id: tempData?.id,
      name: tempData?.name,
      email: tempData?.email,
      phoneNumber: tempData?.phoneNumber,
    } as Contact;

    console.log(this.updatedData);

    this.serv.updateContact(this.updatedData).subscribe((res) => {
      // console.log(res);
    });
  }

  // Delete row data function
  onDeleteRow(event: any) {
    console.log(event.data.id);

    this.serv.deleteContact(event.data.id).subscribe((res) => {
      console.log(res);
    });
  }

  // On Row Selection printing the name.
  selectedContact!: Contact;

  selectContact(c: any) {
    c.component.byKey(c.currentSelectedRowKeys[0]).done((contact: any) => {
      if (contact) {
        this.selectedContact = contact;
      }
    });
  }

  onRowPrepared(event: any) {
    if(event.rowType === 'data') {
      if(event.data.name.includes('Uchiha')) {
        event.rowElement.style.cssText = "color: white; background-color: green; text-align: center";
      }
    }
  }
}
