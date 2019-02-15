import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SocketClientComponent} from '../comp/socket-client/socket-client.component';
import {RegisterComponent} from "../comp/register/register.component";

const routes: Routes = [
    {path: 'draggable', component: SocketClientComponent},
    {path: 'registration', component: RegisterComponent}
]

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule {
}
