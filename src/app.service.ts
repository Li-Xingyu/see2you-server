import { Injectable } from '@nestjs/common';
import {HttpService,HttpModule}from '@nestjs/axios';


@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}



  getHello(): any {
     this.httpService.get('https://vipmv.co/okplay/143426-8-1.html').toPromise().then(res=>{
       var pattern =/"url_next":"(.*?)"/
       console.log(pattern.exec(res.data)[1]);
      this.httpService.get('https://xkys.ee/dp.php?url='+pattern.exec(res.data)[1]).toPromise().then(res=>{
        // console.log(res.data)
        var pattern = /var url = "(.*?)"/
        console.log(pattern.exec(res.data)[1]);
        return pattern.exec(res.data)[1];
        
      })
  
  
  
  });;
    
   
  }
  
}
