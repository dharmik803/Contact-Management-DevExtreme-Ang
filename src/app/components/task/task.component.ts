import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { SelectContact, Task } from 'src/app/model/task.model';
import { ContactService } from 'src/app/services/contact.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  // Variable Declarations here
  taskList!: Array<Task>;
  priorities: Array<string> = ['Low', 'Medium', 'High'];
  status: Array<string> = ['To Do', 'In Progress', 'Completed'];
  contactList: Contact[] = [];
  dropDownContacts: SelectContact[] = [];
  assignedTo!: any;
  addItem!: Task;

  constructor(
    private taskService: TaskService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.onLoadGetTaskList();
    this.onLoadGetContactList();
  }

  // Get all contact list function
  onLoadGetContactList() {
    this.contactService.getContactList().subscribe((data) => {
      this.contactList = data;
      this.dropDownContacts = this.contactList.map((item) => ({
        id: item.contactId,
        name: item.name,
      }));

      // Select Dropdown items of array
      // this.assignedTo = {
      //   items: this.dropDownContacts.map((con) => con.name),
      //   values: this.dropDownContacts.map((con) => con.id),
      // };

      this.assignedTo = {
        dataSource: this.dropDownContacts,
        valueExpr: "id",
        displayExpr: "name"
      }

    });
  }

  // get all Task list function
  onLoadGetTaskList() {
    this.taskService.getTaskList().subscribe((data) => {
      this.taskList = data;
    });
  }

  // On initializing new row  function.
  onInitNewRow(event: any) {}
  onRowPrepared(event: any) {
    if(event.rowType === 'data'){
      if(event.data.status === 'Completed'){
        event.rowElement.style.backgroundColor = 'MediumSeaGreen';
      }
    }
  }

  // On Row data add client side api code
  onRowInserted(event: any) {
    console.log(event.data);

    const assignedCon = this.contactList.find(
      (data) => data.contactId === event.data.assignedToId
    );

    this.addItem = {
      taskId: 0,
      title: event.data.title,
      description: event.data.description,
      dueDate: event.data.dueDate,
      priority: event.data.priority,
      status: event.data.status,
      assignedToId: event.data.assignedToId,
      assignedTo: assignedCon as Contact,
    };
    console.log(this.addItem);

    this.taskService.addTask(this.addItem).subscribe(
      async () => {
        await this.onLoadGetTaskList();
        await this.onLoadGetContactList();
      },
      (error) => {
        console.log(`Task has not been added : ${error.message}`);
      }
    );
  }

  // On Row data Update client side api code.
  onRowUpdated(event: any) {

    const tempData = this.taskList.find(
      (data) => data.taskId === event.data.taskId
    ) as Task;

    tempData.assignedTo = this.contactList.find(
      (data) => data.contactId === event.data.assignedToId
    ) as Contact;
    
      
    this.taskService.updateTask(tempData).subscribe(
      async () => {
        await this.onLoadGetTaskList();
        await this.onLoadGetContactList();
      },
      (error) => {
        console.log(`Failed to update the Task : ${error.message}`);
      }
    );
  }

  // On Row data Delete client side api code
  onRowRemoved(event: any) {
    this.taskService.deleteTask(event.data.taskId).subscribe(
      async () => {
        await this.onLoadGetTaskList();
        await this.onLoadGetContactList();
      },
      (error) => {
        console.log(`Failed to Delete the Task : ${error.message}`);
      }
    );
  }
}
