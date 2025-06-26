import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Ajoutez cette ligne
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { ChambreComponent } from './chambre/chambre.component';
import { ChatComponent } from './chat/chat.component';
import { ReservationComponent } from './reservation/reservation.component';
import { HabilitationComponent } from './habilitation/habilitation.component';
import { ChatAdminComponent } from './chat-admin/chat-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from './Services/chat.service';
import { UserService } from './Services/user.service';
import { AjoutHotelComponent } from './ajout-hotel/ajout-hotel.component';
import { HotelService } from './Services/hotel.service';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    ChambreComponent,
    ChatComponent,
    ReservationComponent,
    HabilitationComponent,
    ChatAdminComponent,
    AjoutHotelComponent,
    EditHotelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,// Ajoutez ceci
    FormsModule, // <-- Ajoutez ce module
    HttpClientModule, // <-- Ajoutez ce module
    AppRoutingModule
  ],
  providers: [ChatService,UserService,HotelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
