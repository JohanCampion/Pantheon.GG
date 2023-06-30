import { Component } from '@angular/core';
import Web3 from "web3";
import { Web3Service} from "./services/web3.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent {



  isExpand = false;
  menuState: string = 'out';

  expandMenu() {
    this.isExpand = !this.isExpand;
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  constructor(public t: Web3Service, private auth: AuthService) {
  }

  connect() {
    this.t.bootstrapWeb3();
  }

  creerTournoi() {
    this.t.getMesTournois();
  }
  //
  voirTournoi() {
    this.t.getHeroes().then(r => console.log(r));
  }

  test() {
    // @ts-ignore
    this.auth.login();
  }


}
