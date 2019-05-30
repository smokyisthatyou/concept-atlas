import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AtlasListComponent } from './atlas-list/atlas-list.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';

import { getAuthServiceConfigs } from './socialloginConfig';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AtlasListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'atlas', component: AtlasListComponent},
      { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
      // { path: '**', component: PageNotFoundComponent }
    ]),
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
