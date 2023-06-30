import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss']
})
export class SimpleButtonComponent implements OnInit {

  @Input()
  text: string = '';

  @Input()
  image: boolean = false;

  public onclick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitClick(event: any) {
    this.onclick.emit(event);
  }

}
