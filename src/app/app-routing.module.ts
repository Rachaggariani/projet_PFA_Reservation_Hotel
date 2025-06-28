import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ChambreComponent } from './chambre/chambre.component';
import { ReservationComponent } from './reservation/reservation.component';
import { HabilitationComponent } from './habilitation/habilitation.component';
import { ChatAdminComponent } from './chat-admin/chat-admin.component';
import { AjoutHotelComponent } from './ajout-hotel/ajout-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { TranslateComponent } from './translate/translate.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection vers /home
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'hotels/:hotelId/chambres', component: ChambreComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'chat_Admin', component: ChatAdminComponent },
  { path: 'habilitation', component: HabilitationComponent },  // ... autres routes
  { path: 'AjoutHotel', component: AjoutHotelComponent },
  { path: 'EditHotel/:id', component: EditHotelComponent },
  { path: 'translate', component: TranslateComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
