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
  formData!: Contact;
  formVisible!: boolean;

  @ViewChild(DxDataGridComponent)
  dataGrid!: DxDataGridComponent;

  constructor(private serv: ContactService) {}

  // OnInit
  ngOnInit(): void {
    this.serv.getContactList().subscribe((data) => {
      this.contactList = data;
    });
    this.formVisible = false;
  }


  // Add row data function
  onInitNewRow(event: any){
    this.formVisible = true;
    this.formData = {
      contactId: 0,
      name: '',
      email: '',
      phoneNumber: 0
    }
  }


  onInsertedRow(event: any) {
    console.log(event);

    this.addedData = {
      contactId: 0,
      name: event.data.name,
      email: event.data.email,
      phoneNumber: event.data.phoneNumber,
    };

    this.serv.addContact(this.addedData).subscribe((res) => {
      
    });
    this.formVisible = false;
  }

  // Edit row data function
  onEditingStart(event: any){
    this.formVisible = true;
    this.formData = event.data
  }

  onEditCanceled(){
    this.formVisible = false;
  }

  onRowUpdated(event: any) {

    const tempData = this.contactList.find((data) => data.contactId === event.data.contactId);
    this.updatedData = {
      contactId: tempData?.contactId,
      name: tempData?.name,
      email: tempData?.email,
      phoneNumber: tempData?.phoneNumber,
    } as Contact;

    this.serv.updateContact(this.updatedData).subscribe((res) => {
    });
    this.formVisible = false;
  }

  // Delete row data function
  onRowRemoved(event: any) {

    this.serv.deleteContact(event.data.contactId).subscribe((res) => {
      
    });
  }



  // On Row Selection printing the name.
  // selectedContact!: Contact;

  // selectContact(c: any) {
  //   c.component.byKey(c.currentSelectedRowKeys[0]).done((contact: any) => {
  //     if (contact) {
  //       this.selectedContact = contact;
  //     }
  //   });
  // }

  // onRowPrepared(event: any) {
  //   if(event.rowType === 'data') {
  //     if(event.data.name.includes('Uchiha')) {
  //       event.rowElement.style.cssText = "color: white; background-color: green; text-align: center";
  //     }
  //   }
  // }
}
