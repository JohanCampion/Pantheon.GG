import {Component, OnInit} from '@angular/core';
import {TournoiService} from "../../services/tournoi.service";
import {Tournoi} from "../../model/tournoi";
import {map} from "rxjs";

@Component({
  selector: 'app-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.scss']
})
export class TournoisComponent implements OnInit {

  tournoisOwned: number[] = [];

  tournoisPlayer: Tournoi[] = [];

  constructor(private tournoiService: TournoiService) {
  }

  ngOnInit(): void {
    console.log('init');
    this.tournoiService.getTournoiOwned().pipe(
      map(value => value.map(value1 => Number(value1))))
      .subscribe(value => this.tournoisOwned = value);
  }

  protected readonly Number = Number;
}
