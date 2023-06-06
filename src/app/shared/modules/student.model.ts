export class Student{
    
        studentId:number;
        Name:string;
        RollNo:number;
        Class:string;
        Division:string;
        Stream:string;
        Date:string;
        File:{
            data:string,
            name:string,
        };
        constructor(){
            this.studentId=0;
            this.Name='';
            this.RollNo=1;
            this.Class='';
            this.Division='';
            this.Stream='';
            this.Date='';
            this.File={
                data :'',
                name :'',
            };
        }
        

}