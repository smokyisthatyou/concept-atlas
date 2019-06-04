import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AtlasComponent } from './atlas/atlas.component';
import { AtlasViewComponent } from './atlas-view/atlas-view.component';
import { MapworkViewComponent } from './mapwork-view/mapwork-view.component';
import { AuthGuard } from './common/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'atlas', component: AtlasComponent, canActivate: [AuthGuard] },
  { path: 'atlas-view/:idatlas', component: AtlasViewComponent, canActivate: [AuthGuard] },
  { path: 'mapwork-view/:idmapwork', component: MapworkViewComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
