import { Contact } from './contact.model';

export interface Task {
  taskId: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  assignedToId: number;
  assignedTo: Contact;
}


export interface SelectContact {
    id: number,
    name: string
}