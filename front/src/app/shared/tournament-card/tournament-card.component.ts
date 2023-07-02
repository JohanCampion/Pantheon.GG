import {Component, Input, OnInit} from '@angular/core';
import {TournoiService} from "../../services/tournoi.service";
import {Tournoi} from "../../model/tournoi";
import {Status} from "../../model/Status";

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss']
})
export class TournamentCardComponent implements OnInit {

  @Input()
  tournamentId: number | undefined;

  constructor(private tournoiService: TournoiService) { }

  tournoi?: Tournoi;

  ngOnInit(): void {
    if(this.tournamentId !== undefined) {
      this.tournoiService.getTournoiById(this.tournamentId).subscribe(tournoi => {
        this.tournoi = tournoi;
      })
    }
  }

  Status = Status;
  Number = Number;
}
