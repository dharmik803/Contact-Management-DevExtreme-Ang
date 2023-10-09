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
    this.serv.getContactList().subscribe(
      (data) => {
      this.contactList = data;
    },
    (error) => {
      console.log(`Failed to load the Contact List: ${error.message}`);
    }
    );
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

    this.serv.addContact(this.addedData).subscribe(
      () => {
        console.log(`Contact has been Added!`);
      this.onLoadGetContactList();
    },
    (error) => {
      console.log(`Failed to add Contact : ${error.message}`)
    }
    );
  }

  // Edit row data function
  onEditingStart(event: any) {
    this.formData = event.data;
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
    this.serv.updateContact(this.updatedData).subscribe(
      () => {
        console.log(`Contact has been Updated Successfully!`);
      },
      (error) => {
        console.log(`Failed o update the Contact : ${error.message}`)
      }
    );
  }


  // Delete row data function
  onRowRemoved(event: any) {
    this.serv.deleteContact(event.data.contactId).subscribe(
      () => {
        console.log(`Contact with the id ${event.data.contactId} has been Deleted!`);
      },
      (error) => {
        console.log(`Failed to Delete the Contact with id ${event.data.contactId} : ${error.message}`)
      }
    );
  }


  // On focus Row Data changed function from here
  onFocusedRowChanged(event: any) {
    this.formData = event.row.data;
  }


  // on Row doble click event editing function
  onRowDblClick(event: any) {
    if(event.data.key !== this.editedRowKey){
      this.dataGrid.instance.editRow(event.rowIndex);
      this.editedRowKey = null;
    }
  } 


  // ON submit form button data value updated or added.
  saveButtonOptions = {
    text: "Save",
    type: "success",
    onClick: this.onFormSaveClick.bind(this)
  }

  onFormSaveClick(event: any) {
    const contact: Contact = {
      contactId: this.formData.contactId,
      name: this.formData.name,
      email: this.formData.email,
      phoneNumber: this.formData.phoneNumber
    }

    console.log(contact);

    if(contact.contactId === undefined){
      this.serv.addContact(contact).subscribe(
        () => {
          console.log(`Contact has been Created!`)
          this.onLoadGetContactList();
        },
        (error) => {
          console.log('Failed to create Contact : ' + error.message);
        })
    }
    else{
      this.serv.updateContact(contact).subscribe(
        () => {
          console.log('updated')
        },
        (error) => {
          console.log(`Failed to update the Contact ; ${error.message}`)
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

  onFormDeleteClick(event: any){
    const id = this.formData.contactId
    console.log(id)
    if(id !== undefined){
      this.serv.deleteContact(id).subscribe(
        () => {
          console.log(`Contact with the id ${id} has been Deleted!`);
          this.onLoadGetContactList();
        },
        (error) => {
          console.log(`Failed to delete the contact with id ${id} : ${error.message}`);
        }
      )
    }
    this.isDeletePopupVisible = !this.isDeletePopupVisible;
  }
  
}
