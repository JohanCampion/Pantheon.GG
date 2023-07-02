import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

  @Input()
  text: string = '';

  @Input()
  delete: boolean= false;

  @Output()
  public onDelete: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteEvent(event: any) {
    this.onDelete.emit(event);
  }

}
