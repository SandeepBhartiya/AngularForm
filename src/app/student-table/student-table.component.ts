import { Component,OnInit  } from '@angular/core';
import { Student } from '../shared/modules/student.model';
import { StudentDataService } from '../student-data.service';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http"
import {Pipe, PipeTransform} from '@angular/core';
import { filter } from 'rxjs';  
import { FileDownloadService } from '../file-download.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css'],
})

export class StudentTableComponent  {
  filterText:string='';
  filteredItems:any[]=[];
  students:Student[];
  constructor(private fileDownload:FileDownloadService,private httpClient:HttpClient,private studentDataService:StudentDataService,private router:Router){
  this.students=[];
  }

  filterItems(){
    if(!this.filterText){
      return this.students;
    }
   const filterText=this.filterText.toLocaleLowerCase();
   return this.filteredItems= this.students.filter(item=>{
      return item.Name.toLocaleLowerCase().includes(filterText) ||item.Class.includes(filterText)||item.Division.toLocaleLowerCase().includes(filterText)
              ||item.Stream.toLocaleLowerCase().includes(filterText)||item.Date.includes(filterText)
    })
    
  }

  ngOnInit(){
    // console.log(this.students);
    this.students=this.studentDataService.getStudentData();
    this.filteredItems=this.students;
  } 
  
  updateStudent(i:number){
   const editStudent:Student=this.students[i];
   console.log('Edit',editStudent.studentId);
   const eid=editStudent.studentId;
   this.router.navigate(['/student-form','edit',editStudent.studentId,{mode:'edit'}]);
  }

  deleteStudent(i:number){
    this.studentDataService.deleteStudent(i);
  }

  uploadFile(event:any){
    const file:File=event.target.files[0];
    this.filePreview(file);
  }
  filePreview(file:File)
  {
     
      const formData:FormData=new FormData();
      formData.append('file',file,file.name);
      this.httpClient.post('/api/upload',formData).subscribe((response)=>{
        console.log("File Upload Successfully");
      },
      (errors)=>{
        console.error("Error Upload File",errors);
      });

  }
   removeBase64ImgPrefix(base64Data: string): string {
    const prefix = "data:image/png;base64,";
    if (base64Data.startsWith(prefix)) {
      return base64Data.substring(prefix.length);
    }
    return base64Data;
  }
  removeJpeg(base64Data:string):string{
    const prefix="data:image/jpeg;base64"
    if(base64Data.startsWith(prefix)){
      return base64Data.substring(prefix.length);
    }
    return base64Data;
  }
  removeBase64TextPrefix(base64Data: string): string {
    const prefix = "data:text/plain;base64,";
    if (base64Data.startsWith(prefix)) {
      return base64Data.substring(prefix.length);
    }
    return base64Data;
  }
  
  downloadDataWithId(id:number){
    const studentInfo=this.studentDataService.getStudentDataById(id);
    const data=studentInfo.File.data;
    
    let encodedData;
    if(data.match(/^data:image\/png/))
    {
       encodedData=this.removeBase64ImgPrefix(data);
    }
    else if(data.match(/^data:image\/jpeg/))
    {
      encodedData=this.removeJpeg(data)
    }
    else{
      
       encodedData=this.removeBase64TextPrefix(data)
    }
    
  const fileExtension = studentInfo.File.name.split('.').pop();
  let fileType = '';

  if (fileExtension) {
    switch (fileExtension.toLowerCase()) {
      case 'pdf':
        fileType = 'application/pdf';
        break;
      case 'png':
        fileType = 'image/png';
        break;
      case 'jpg':
      case 'jpeg':
        fileType = 'image/jpeg';
        break;
      case 'txt':
        fileType = 'text/plain';
        break;
     
      default:
        fileType = 'application/octet-stream';
        break;
    }
  } else {
    fileType = 'application/octet-stream';
  }
    const decodeData=atob(encodedData);
  
    const fileName=studentInfo.File.name;
    if(fileType=='image/png' ||fileType=="image/jpeg")
    {
      this.fileDownload.downloadImageFile(decodeData,fileType,fileName)
    }
    else
    {
      this.fileDownload.downloadFile(decodeData,fileName);
    }
  }

}


