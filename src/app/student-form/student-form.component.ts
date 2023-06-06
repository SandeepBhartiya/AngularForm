import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Student } from '../shared/modules/student.model';
import { StudentDataService } from '../student-data.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { isEmpty } from 'rxjs';



@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  userData: any[] = [];
  myForm: FormGroup;
  students: Student = new Student();
  isEditing: boolean = false;
  selectFileName: string = '';
  selectFileData: string = '';
  datePipe: DatePipe = new DatePipe('en-IN');

  constructor(
    private httpClient: HttpClient,
    private activeRoute: ActivatedRoute,
    private formBuider: FormBuilder,
    private studentDataService: StudentDataService,
    private localService: LocalService
  ) {
    this.myForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      RollNo: new FormControl('', Validators.required),
      Class: new FormControl('', Validators.required),
      Division: new FormControl('', Validators.required),
      Stream: new FormControl('', Validators.required),
      Date: new FormControl('', Validators.required),
      File: new FormControl('', Validators.required),
    });
    this.students = new Student();
  }

  //check wether there is need to add data or Update based on result form may change
  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params) => {
      const mode = params.get('mode');
      const studentId = params.get('studentId');
      console.log('sid', studentId, mode);

      if (mode && studentId) {
        this.isEditing = true;
        this.students = this.studentDataService.getStudentDataById(
          Number(studentId)
        );
      
        const dataString = this.localService.getData(studentId);
        // if (dataString) {
        //   const k = dataString;
        // }

        if (this.students) {
          this.myForm.patchValue({
            studentId: this.students.studentId,
            Name: this.students.Name,
            RollNo: this.students.RollNo,
            Class: this.students.Class,
            Division: this.students.Division,
            Stream: this.students.Stream,
            Date: this.students.Date,
            File: this.students.File?.name,
          });
          this.selectFileName = this.students.File?.name; //to display filename when user update it i.e Edit it.
        }
      } else {
        this.isEditing = false;
        this.students = new Student();
      }
    });
  }

  //Reset the form Field
  resetForm() {
    this.myForm.reset();
  }

  //upload the file and store in the local storage in 64 base encoded formate for easy to storing as it max size is 5MB
  uploadFile() {
    const fileInput: HTMLInputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file: File | null = fileInput?.files?.[0] || null;
 

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.selectFileName = file.name;
        this.selectFileData = event.target.result;
        const fileData = event.target.result;
        // const unit8Ar=new Uint8Array(fileData);
        // const bString=unit8Ar.reduce((acc,byte)=>acc+String.fromCharCode(byte),'');
        // const base64String=btoa(bString);
        console.log(fileData);
        
        return fileData;
      };

      if(file.type=='application/pdf')
      {
        console.log('Your file is PDF');
        
        reader.readAsArrayBuffer(file);
      }
      else{
        reader.readAsDataURL(file);
      }
    }
  }

  //get the current TimeZone Date
  getCurrentDate() {
    const currentDate = new Date();
    const formateDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    return formateDate || ' ';
  }




  //submit the form data to the Array
  submitForm() {
    if (this.isEditing) {
      if (this.myForm.valid) {
        const studentData: Student = this.myForm.value;
        studentData.studentId = this.students.studentId;
        studentData.File = {
          name: this.selectFileName,
          data: this.selectFileData,
        };
        this.studentDataService.updateStudentDetail(
          this.students?.studentId,
          studentData
        );
        alert('Student Record Updated');
        this.resetForm();
        this.selectFileName = '';
        this.selectFileData = '';
      }
    } else {
      const m = this.studentDataService.getStudentData();

      //add new student record
      if (this.myForm.valid) {
        const studentData: Student = this.myForm.value;
        studentData.File = {
          name: this.selectFileName,
          data: this.selectFileData,
        };
        const name = m.filter((data) => data.Name === studentData.Name)||0;
        const rollno = m.filter((data) => data.RollNo === studentData.RollNo)||0;
        if (name.length !== 0) {
          if (rollno.length !== 0) {
            alert('Please provide different Rollno.It already been Used!!!');
          } else {
            alert('Please provide different Name. It already been Used!!! ');
          }
          return;
        } else {
          if (rollno.length !== 0) {
            alert('Please provide different Rollno.It already been Used!!!');
          } else {
            const date = this.datePipe.transform(
              studentData.Date,
              'yyyy-MM-dd'
            );
            studentData.Date = date ?? ''; //?? Check wether the date is null or not if null then provide it empty string
            this.studentDataService.addStudentData(studentData);
            alert('Student Record Created');
            this.resetForm();
            this.selectFileName = '';
            this.selectFileData = '';
          }
        }
      }
    }
  }
}
