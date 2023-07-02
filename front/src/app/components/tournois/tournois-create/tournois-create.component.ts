import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../model/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {TournoiService} from "../../../services/tournoi.service";

@Component({
  selector: 'app-tournois-create',
  templateUrl: './tournois-create.component.html',
  styleUrls: ['./tournois-create.component.scss']
})
export class TournoisCreateComponent implements OnInit {


  createForm!: FormGroup;

  inputParticipant = new FormControl('');
  filtererUser$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  addedParticipant$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(formBuilder: FormBuilder, private http: HttpClient, private tournoiService: TournoiService) {
    this.createForm = formBuilder.group({
      name: new FormControl('', Validators.required),
      date_de_debut: new FormControl('', Validators.required),
      participants: new FormControl([])
    });
  }

  ngOnInit(): void {
  }

  get participants(): FormArray {
    return this.createForm.controls['participants'] as FormArray;
  }


  async onKeyup(event: any) {
    if (this.inputParticipant.value.length > 2) {
      let params = new HttpParams();
      params = params.append('name', this.inputParticipant.value);
      this.http.get<User[]>('http://localhost:8555/api/users', {params: params}).subscribe(value => this.filtererUser$.next(value))
    } else {
      this.filtererUser$.next([]);
    }
  }

  addParticipant(user: User) {
    this.addedParticipant$.next([...this.addedParticipant$.value, user]);
    this.participants.setValue(this.addedParticipant$.value.map((value) => value.publicAddress));
    this.filtererUser$.next([]);
    this.inputParticipant.setValue('');
  }

  deleteParticipant(user: User) {
    this.addedParticipant$.next(this.addedParticipant$.value.filter((v) => v.id !== user.id));
    this.participants.setValue(this.addedParticipant$.value.map((value) => value.publicAddress));
  }

  submit() {
    if(this.createForm.valid && this.addedParticipant$.value.length > 1) {
      const result = this.tournoiService.createTournoi(this.createForm.value).then();
    }
  }

}
