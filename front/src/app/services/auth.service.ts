import {Injectable, OnInit} from '@angular/core';
import Web3 from "web3";
import * as moment from "moment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Web3Service} from "./web3.service";
import {of, switchMap} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private web3: Web3Service) {

  }

  login(publicAddress:string ) {
    let params = new HttpParams();
    // @ts-ignore
    params = params.append('publicAddress', this.web3.getAccount());
    this.http.get<User>('http://localhost:8555/api/users', {params: params}).pipe(
      switchMap((user: User) => {
        if (user == null) {
          console.log('tu na pas de compte');
        }
        return of(user);
      }),
      switchMap((user: User) => {
        console.log('user : ', user);
        // @ts-ignore
        const result = this.web3.sign(user[0].nonce);
        return result;
      }),
      switchMap((sig: any) => {
        console.log(sig);
        return this.http.post('http://localhost:8555/api/auth', {publicAddress: this.web3.getAccount(), signature: sig});
      })
    ).subscribe(value => console.log(value));

  }

  private setSession(authResult: any) {
    localStorage.setItem('id_token', authResult.idToken);
  }

  logout() {
    localStorage.removeItem("id_token");
  }

}
