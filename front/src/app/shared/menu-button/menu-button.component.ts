import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '6rem',
        })
      ),
      state(
        'closed',
        style({
          width: '*',
        })
      ),
      transition('open => closed', [animate('0.30s ease-in-out')]),
      transition('closed => open', [animate('0.30s ease-in-out')]),
    ]),
  ],
})
export class MenuButtonComponent implements OnInit {

  @Input()
  icon: string = '';

  @Input()
  text: string = '';

  @Input()
  isExpand: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
