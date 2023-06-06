import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(key:string,value:string)
  {
    localStorage.setItem(key,value);
    // console.log('LocalStorage','Key',key,typeof localStorage); 
  }


  public getData(key:string)
  {
    const dataString=localStorage.getItem(key);
    // console.log('dString','Key',key,dataString,typeof key);    
    if(dataString)
    {
      const data= JSON.parse(dataString);
      return data;      
    }
    return null;
  }



  public getDataAll(){
    const dataString=localStorage.getItem('');
    if(dataString)
    {
      const data=JSON.stringify(dataString);
      return data;
    }
    else{
      return null;
    }
  }


}
