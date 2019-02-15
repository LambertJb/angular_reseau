import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './comp/app/app.component';
import {SocketClientComponent} from './comp/socket-client/socket-client.component';

import {AppRoutingModule} from './route/app-routing.module';
import {FormsModule} from "@angular/forms";
import {AccueilComponent} from "./comp/accueil/accueil.component";
import {RegisterComponent} from "./comp/register/register.component";

@NgModule({
    declarations: [
        AppComponent,
        SocketClientComponent,
        AccueilComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
