import {Component, Input, OnInit} from '@angular/core';
import {TournoiService} from "../../../services/tournoi.service";
import {Tournoi} from "../../../model/tournoi";
import {ActivatedRoute} from "@angular/router";
import {Web3Service} from "../../../services/web3.service";
import {Status} from "../../../model/Status";

@Component({
  selector: 'app-tournoi-consultation',
  templateUrl: './tournoi-consultation.component.html',
  styleUrls: ['./tournoi-consultation.component.scss']
})
export class TournoiConsultationComponent implements OnInit {

  @Input()
  tournamentId: number | undefined;

  tournoi!: Tournoi;

  nowDate = new Date();

  dateDebutTournoi: number = 0;

  constructor(private tournoiService: TournoiService, private route: ActivatedRoute, public web3: Web3Service) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id !== null && id !== undefined) {
      console.log(this.tournamentId);
      this.tournoiService.getTournoiById(id).subscribe(tournoi => {
        this.tournoi = tournoi;
        this.dateDebutTournoi = Number(tournoi.date_de_debut);
        console.log(this.tournoi);
      })
    }
    this.web3.abi.events.TournoiEvent(() => {
    }).on('data', (event: any) => {
      console.log('reload');
      this.reloadData()
    });
  }

  register() {
    if (this.tournoi.tournamentId) {
      this.tournoiService.registerTournoi(this.tournoi.tournamentId);
    }
  }

  validation() {
    const fakeWinner = this.tournoi.participants?.slice(0,1);
    this.tournoiService.validation(fakeWinner!, this.tournoi.tournamentId);

  }

  reloadData() {
    this.tournoiService.getTournoiById(this.tournoi.tournamentId!).subscribe(tournoi => {
      console.log(tournoi);
      this.tournoi = tournoi;
      this.dateDebutTournoi = Number(tournoi.date_de_debut);
      console.log(this.tournoi);
    })
  }

  Status = Status;
  Number = Number;
}
