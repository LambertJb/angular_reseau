import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocketClientComponent } from './socket-client/socket-client.component';

const routes: Routes = [
  { path: '', redirectTo: '/draggable', pathMatch: 'full' },
  { path: 'draggable', component: SocketClientComponent }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
