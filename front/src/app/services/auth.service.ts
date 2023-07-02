import {Injectable, OnInit} from '@angular/core';
import Web3 from "web3";
import * as moment from "moment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Web3Service} from "./web3.service";
import {of, Subject, switchMap} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userConnected: User | null = null;

  constructor(private http: HttpClient, private web3: Web3Service) {
    this.userConnected = JSON.parse(localStorage.getItem('user')!);

  }

  login() {
    let params = new HttpParams();
    let _user: User;
    // @ts-ignore
    params = params.append('publicAddress', this.web3.getAccount());
    this.http.get<User>('http://localhost:8555/api/users', {params: params}).pipe(
      switchMap((user: User) => {
        if (user == null) {
          console.log('tu na pas de compte');
        }
        // @ts-ignore
        _user = user[0];
        return of(user);
      }),
      switchMap((user: User) => {
        // @ts-ignore
        const result = this.web3.sign(user[0].nonce);
        return result;
      }),
      switchMap((sig: any) => {
        console.log(sig);
        return this.http.post('http://localhost:8555/api/auth', {
          publicAddress: this.web3.getAccount(),
          signature: sig
        });
      })
    ).subscribe((value: any) => {
      this.setSession(value.accessToken);
      this.http.get<User>(`http://localhost:8555/api/users/${_user.id}`).subscribe(user => {
        console.log(user);
        this.userConnected = user;
        localStorage.setItem('user', JSON.stringify(user));
      })
    });

  }

  private setSession(authResult: any) {
    localStorage.setItem('id_token', authResult);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('id_token');
    return authToken !== null ? true : false;
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
  }

  test() {
    this.http.get<User>(`http://localhost:8555/api/users/1`).subscribe(user => {
      console.log(user);
    })
  }

}
