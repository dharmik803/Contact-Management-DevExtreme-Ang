import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  // Variables initialized.
  contactList: Contact[] = [];
  updatedData!: Contact;
  addedData!: Contact;
  deletedData!: Contact[];
  formData: Contact = {
    contactId: 0,
    name: '',
    email: '',
    phoneNumber: '',
  };
  editingOptions: any;
  editedRowKey: any = null;
  isFormReadOnly!: boolean;
  isDeletePopupVisible: boolean = false;


  //  ViewChild decorator
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  //constructor method
  constructor(private serv: ContactService) {}

  // OnInit
  ngOnInit(): void {
    
    this.onLoadGetContactList();

    // Editing options
    this.editingOptions = {
      mode: 'row',
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: true,
      useIcons: true,
    };
  }


  // Get Contact list method 
  onLoadGetContactList(){
    this.serv.getContactList().subscribe((data) => {
      this.contactList = data;
    });
  }


  // Add row data function
  onInitNewRow(event: any) {
    this.formData = {
      contactId: 0,
      name: '',
      email: '',
      phoneNumber: '',
    };
  }

  onInsertedRow(event: any) {
    console.log(event);

    this.addedData = {
      contactId: 0,
      name: event.data.name,
      email: event.data.email,
      phoneNumber: event.data.phoneNumber,
    };

    this.serv.addContact(this.addedData).subscribe(() => {
      this.onLoadGetContactList();
    });
  }

  // Edit row data function
  onEditingStart(event: any) {
    this.formData = event.data;
  }

  onRowUpdating(event: any) {
    console.log(event);
  }

  onRowUpdated(event: any) {
    const tempData = this.contactList.find(
      (data) => data.contactId === event.data.contactId
    );
    this.updatedData = {
      contactId: tempData?.contactId,
      name: tempData?.name,
      email: tempData?.email,
      phoneNumber: tempData?.phoneNumber,
    } as Contact;
    this.serv.updateContact(this.updatedData).subscribe((res) => {});
  }


  // Delete row data function
  onRowRemoved(event: any) {
    this.serv.deleteContact(event.data.contactId).subscribe((res) => {});
  }


  // On focus Row Data changed function from here
  onFocusedRowChanged(event: any) {
    this.formData = event.row.data;
  }


  // on Row doble click event editing function
  onRowDblClick(event: any) {
    if(event.data.key !== this.editedRowKey){
      this.dataGrid.instance.editRow(event.rowIndex);
      this.editedRowKey = event.data.key;
    }
  } 


  // ON submit form button data value updated or added.
  saveButtonOptions = {
    text: "Save",
    type: "success",
    onClick: this.onSaveClick.bind(this)
  }

  onSaveClick(event: any) {
    const contact: Contact = {
      contactId: this.formData.contactId,
      name: this.formData.name,
      email: this.formData.email,
      phoneNumber: this.formData.phoneNumber
    }

    console.log(contact);

    if(contact.contactId === undefined){
      this.serv.addContact(contact).subscribe(res => {
        console.log('added')
      })
    }
    else{
      this.serv.updateContact(contact).subscribe(res => {
        console.log('updated')
      });
    }
  }


  // Form on Delete button method.
  deleteButtonOptions = {
    text: 'Delete',
    type: 'danger',
    onClick: this.onClickOpenPopup.bind(this)
  }

  onClickOpenPopup(){
    this.isDeletePopupVisible = true;
  }

  onDeleteClick(event: any){
    const id = this.formData.contactId
    console.log(id)
    if(id !== undefined){
      this.serv.deleteContact(id).subscribe(res => {
        console.log('deleted')
        this.onLoadGetContactList();
      })
    }
    this.isDeletePopupVisible = !this.isDeletePopupVisible;
  }
  
}
