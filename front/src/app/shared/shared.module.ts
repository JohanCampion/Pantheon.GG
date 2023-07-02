import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { SimpleButtonComponent } from './simple-button/simple-button.component';
import { TournamentCardComponent } from './tournament-card/tournament-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import { ChipsComponent } from './chips/chips.component';
import { GenericButtonComponent } from './generic-button/generic-button.component';
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import { PlayerNameComponent } from './player-name/player-name.component';
import { TimerComponent } from './timer/timer.component';



@NgModule({
    declarations: [
        MenuButtonComponent,
        SimpleButtonComponent,
        TournamentCardComponent,
        ChipsComponent,
        GenericButtonComponent,
        PlayerNameComponent,
        TimerComponent
    ],
  exports: [
    MenuButtonComponent,
    SimpleButtonComponent,
    TournamentCardComponent,
    ChipsComponent,
    PlayerNameComponent,
    TimerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    RouterModule
  ]
})
export class SharedModule { }
