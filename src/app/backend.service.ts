import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Headers, RequestOptions } from '@angular/http';
import { Target } from './target'
import { Item } from './item'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BackendService {

  private url = 'http://zeroparticle.net:3000';


  constructor(private http: HttpClient) { }

  getRegistered() {
    return this.http.get(this.url + '/registered')
  }

  setTarget(id: number, targetId: number) {
    let body = {"id":id, "targetId":targetId}
    return this.http.post(this.url + '/set/target/', body, httpOptions)
  }
  // async postSetTarget(target: Target): Promise<void> {
	//   // let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   this.http.post(this.url + "/set/target", target, options).toPromise()
  // }
}
