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

  @ViewChild(DxDataGridComponent)
  dataGrid!: DxDataGridComponent;

  constructor(private serv: ContactService) {}

  ngOnInit(): void {
    this.serv.getContactList().subscribe((data) => {
      this.contactList = data;
    });
  }

  onDeleteClick() {  }

  onEditClick() {}

  onInitNewRow(e: any) {
    e.data.id = this.contactList[ this.contactList.length - 1 ].id + 1;
    console.log(e.data);
  }

//   toolbarItem = [ 
//     {
//         widget: 'dxButton',
//         location: 'after',
//         options: {
//             text: 'Confirm',
//             onClick: this.onEditClick()
//         },
//         toolbar: 'bottom'           
//     },
//     {
//         widget: 'dxButton',
//         location: 'after',
//         options: {
//             text: 'Cancel'
//         },
//         toolbar: 'bottom'
//     }       
// ]


}
