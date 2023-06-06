import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import  {Student} from './shared/modules/student.model'
@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private studentData:Student[]=[];
  private storageKey='studentData';
  public index=1;
  
  constructor(private localService:LocalService){
    const localData=this.localService.getData(this.storageKey);
    const localDataString=JSON.stringify(localData); //convert object to string
    if(localDataString)
    {
      try
      {
        const parseData=JSON.parse(localDataString); //convert to object
        if(Array.isArray(parseData)){
          this.studentData=parseData;
          this.updateIndex();
        }
        else{
          console.error('Invalid data formate');
        }
      }
      catch(err)
      {
        console.error('Error parsing Json data');
      }
    }
  }
  
  
  updateIndex(){
    const lastIndex=this.studentData.length>0?this.studentData[this.studentData.length-1].studentId:0
    this.index=lastIndex+1;
  }



  addStudentData(data:Student)
  {
    data.studentId=this.index;
    this.studentData.push(data)
    // console.log('D',data);
    const datax=JSON.stringify(this.studentData)
    console.log('LocalS',typeof datax);
    this.localService.saveData(this.storageKey,datax);
    this.index++;
  }
  

  getStudentData():Student[]
  {
    return this.localService.getData(this.storageKey)
    // return this.studentData;
  }


  getStudentDataById(index:number):Student{
   const student= this.studentData.find(student=>student.studentId==index)
   return student||new Student();
  }
  

  updateStudentDetail(index:number,data:Student){
 
    this.studentData[index-1]=data;
   this.saveDatatoStorage();
  }
  
  
  deleteStudent(index:number){
    this.studentData.splice(index,1);
    this.saveDatatoStorage();
    alert("Student Record is Removed")
    location.reload();
  }
  



  saveDatatoStorage(){
    const data=JSON.stringify(this.studentData);
    this.localService.saveData(this.storageKey,data);
  }




}

