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
  public key = "";
  constructor(private http: HttpClient) { }

  login(pass) {
    var body = {"pass":pass};
    return this.http.post(this.url + '/login', body, httpOptions);
  }

  getRegistered() {
    return this.http.get(this.url + '/registered')
  }

  setTarget(id: number, targetId: number) {
    let body = {"id":id, "key":this.key, "targetId":targetId}
    return this.http.post(this.url + '/set/target/', body, httpOptions)
  }

  registerBeacon(id) {
    let body = {"id":id, "key":this.key};
    return this.http.post(this.url + '/beacon/register', body, httpOptions);
  }

  remove(id) {
    console.log('Removing: ' + id);
    let body = {"id": String(id), "key": this.key};
    return this.http.post(this.url + '/remove', body, httpOptions)
  }
  // async postSetTarget(target: Target): Promise<void> {
	//   // let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   this.http.post(this.url + "/set/target", target, options).toPromise()
  // }
}
