import { Component, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { TaskserviceService } from '../taskservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl:'./task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  constructor(private fb:FormBuilder,private service:TaskserviceService,private route:Router){}

  isUpdate:boolean=false;
  
  ngOnInit(): void {
   this.getTaskList();
   this.getcompleteTask();
  }

  TaskListForm=this.fb.group({
    taskId:[Validators.required],
    taskName:['',Validators.required],
    priority:['',Validators.required],
    startDate:['',Validators.required],
    endDate:['',Validators.required],
  });

  get taskId(){
    return this.TaskListForm.get('taskId');
  }
  get taskName(){
    return this.TaskListForm.get('taskName');
  }
  get priority(){
    return this.TaskListForm.get('priority');
  }
  get startDate(){
    return this.TaskListForm.get('startDate');
  }
  get endDate(){
    return this.TaskListForm.get('endDate');
  }

  getTaskList(){
   
    this.taskList=[];
    this.taskList=this.service.getTaskList();
  }

  taskList:any=[];
  addTaskList(){
  let newTask=this.TaskListForm.value;
  if(!this.isUpdate){
    this.service.addTask(newTask);
  }
  else{
    this.service.updateTask(newTask);
  }
  this.TaskListForm.reset();
  this.getTaskList();
  console.log(this,this.taskList);
}

deleteTask(taskId:number){
  let alertbox=confirm('Do you want to delete the record of taskid '+taskId+' ?');
  if(alertbox==true)
  {
    this.service.deleteTask(taskId);
    this.getTaskList();
  }

}
    
updateTaskList(task: any) {
    this.isUpdate = true;
    this.TaskListForm.setValue({
      taskId: task.taskId,
      taskName: task.taskName,
      startDate: task.startDate,
      endDate: task.endDate,  
      priority: task.priority
     
    });
}

completedTask(taskId:number){
  this.service.finishTask(taskId);
 // alert("Are you sure? Do you want to move to complete this task?");
  this.getTaskList();
  this.getcompleteTask();
}


completedTaskList:any[]=[];
getcompleteTask(){
 
  this.completedTaskList=[];
 this.completedTaskList=this.service.getCompleteTask();
}

clearForm()
{
  this.TaskListForm.reset();
  this.isUpdate=false;
}

}
