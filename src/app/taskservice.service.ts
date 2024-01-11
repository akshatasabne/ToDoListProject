import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
 totalTaskList:any[]=[];
 private lastId: number = 1;
  constructor() { 
    this.totalTaskList=[{
     taskId:1, taskName:"Added New Task",priority:"High",startDate:"2024-09-09",endDate:"2024-09-12",status:"new"
    }];
    this.lastId = 2;
  }
  private getNextId(): number {
    return this.lastId++;
  }

  getTaskList():any{
    const task=[];
    for(let i=0;i<this.totalTaskList.length;i++){
      if(this.totalTaskList[i].status=='new'){
        task.push(this.totalTaskList[i]);
      }
    }
    return task;
  }

  addTask(task:any):any{
    const newId = this.getNextId();
    this.totalTaskList.push({
      taskId: newId,
      taskName: task.taskName,
      priority: task.priority,
      startDate: task.startDate,
      endDate: task.endDate,
      status: "new"
    });
  }

  deleteTask(taskId:number){
    let i;
    for(i=0; i<this.totalTaskList.length;i++){
      if(this.totalTaskList[i].taskId==taskId){
        break;
      }
    }
    this.totalTaskList.splice(i,1);
  }
  
  public updateTask(task:any):any{
    for(let i=0;i<this.totalTaskList.length;i++){
      if(this.totalTaskList[i].taskId==task.taskId){
        this.totalTaskList[i].taskName=task.taskName;
        this.totalTaskList[i].priority=task.priority;
        this.totalTaskList[i].startDate=task.startDate;
        this.totalTaskList[i].endDate=task.endDate;
        break;
      }
    }
  }

  finishTask(taskId:number){
    for(let i=0;i<this.totalTaskList.length;i++){
      if(this.totalTaskList[i].taskId==taskId){
        this.totalTaskList[i].status="done";
        break;
      }
    }
  }

  getCompleteTask(){
    const task=[];
    for(let i=0;i<this.totalTaskList.length;i++){
      if(this.totalTaskList[i].status=='done'){
        task.push(this.totalTaskList[i]);
      }
    }
    return task;
  }
}
