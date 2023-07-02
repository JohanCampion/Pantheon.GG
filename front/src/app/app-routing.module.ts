import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TournoisComponent} from "./components/tournois/tournois.component";
import {TournoisCreateComponent} from "./components/tournois/tournois-create/tournois-create.component";
import {TournoiConsultationComponent} from "./components/tournois/tournoi-consultation/tournoi-consultation.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'tournois',
    component: TournoisComponent,
  },
  {
    path: 'tournois/create',
    component: TournoisCreateComponent,
  },
  {
    path: 'tournois/consultation/:id',
    component: TournoiConsultationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
