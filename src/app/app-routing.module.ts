import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'move', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'move', loadChildren: './move/move.module#MovePageModule' },
  { path: 'userhome', loadChildren: './userhome/userhome.module#UserhomePageModule' },
  { path: 'dbusno', loadChildren: './dbusno/dbusno.module#DbusnoPageModule' },
  { path: 'ubusno', loadChildren: './ubusno/ubusno.module#UbusnoPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
