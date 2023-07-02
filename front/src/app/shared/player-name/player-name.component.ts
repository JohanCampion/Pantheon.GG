import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.scss']
})
export class PlayerNameComponent implements OnInit {

  @Input()
  playerAddress: string = '';

  playerName?: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let params = new HttpParams();
    params = params.append('publicAddress', this.playerAddress);
    this.http.get<User[]>('http://localhost:8555/api/users', {params: params}).subscribe(info => {
      this.playerName = info[0].username;
    })
  }

}
