import {Injectable} from '@angular/core';
import {Web3Service} from "./web3.service";
import {Tournoi} from "../model/tournoi";
import {from, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TournoiService {

  constructor(private web3Service: Web3Service) {
  }


  createTournoi(tournoi: Tournoi): any {
    const dateDebut = new Date(tournoi.date_de_debut).getTime();
    return this.web3Service.abi.methods.createTournament(tournoi.name, dateDebut, 1688005903, tournoi.participants, tournoi.participants?.length)
      .send({from: this.web3Service.getAccount()});
  }

  getTournoiOwned(): Observable<string[]> {
    const tournoi = this.web3Service.abi.methods.getMesTournoisJoueurs().call({from: this.web3Service.getAccount()});
    return from(tournoi) as Observable<string[]>;
  }

  getTournoiById(id: number): Observable<Tournoi> {
    const tournoi = this.web3Service.abi.methods.getTournoi(id).call({from: this.web3Service.getAccount()});
    return from(tournoi) as Observable<Tournoi>;
  }

 registerTournoi(tournamentId: number) {
   this.web3Service.abi.methods.checkIn(tournamentId).send({from: this.web3Service.getAccount()});
 }

 validation(winner: string[], id: number) {
    this.web3Service.abi.methods.validation(id, winner).send({from: this.web3Service.getAccount()});
 }
}
