import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor() { }

  downloadFile(data:string,fileName:string){
    const blob=new Blob([data],{type:'application/octet-stream'});
    const url= URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download=fileName
    link.click();
    URL.revokeObjectURL(url);
  }
  downloadImageFile(decodeData:string,fileType:string,fileName:string){
    const arrayBuffer=new ArrayBuffer(decodeData.length);
    const uintArray=new Uint8Array(arrayBuffer);
    for(let i=0;i<decodeData.length;i++)
    {
      uintArray[i]=decodeData.charCodeAt(i);
    }
    const blob=new Blob([uintArray],{type:fileType});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download=fileName;
    link.click();
  }
}
