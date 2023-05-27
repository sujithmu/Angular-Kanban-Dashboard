import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../model/task';
import { DashboardService } from '../services/dashboard.service';
import { CdkDragDrop,  moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  inputForm ! :  FormGroup;
  toDotasks : Task [] = [];
  implementingTasks : Task [] = [];
  doneTasks: Task [] = [];
  updateIndex!: any;

  constructor(private fb : FormBuilder, private service: DashboardService) { }

  ngOnInit(): void {
    this.getData;
    this.inputForm = this.fb.group({
      item : ['', Validators.required]
    });
  }

  getData() {
    this.service.getData().subscribe((res:Task[])=>{
      this.toDotasks = res;
    })
  }

  addTask() {
    this.toDotasks.push({
      description: this.inputForm.value.item,
      status: false
    });
    this.inputForm.reset();
    let data = this.inputForm.value;
  }

  deleteToDoTask(i:number) { 
    this.toDotasks.splice(i,1);
  }

  deleteImplementingTask(i:number) {
    this.implementingTasks.splice(i,1);
  }

  deleteDoneTask(i:number) {
    this.doneTasks.splice(i,1);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex,event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
