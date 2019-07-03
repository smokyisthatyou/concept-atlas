import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AtlasComponent } from './atlas/atlas.component';
import { AtlasListComponent } from './atlas/atlas-list/atlas-list.component';
import { AtlasViewComponent } from './atlas-view/atlas-view.component';
import { MapworkListComponent } from './atlas-view/mapwork-list/mapwork-list.component';
import { MapworkViewComponent } from './mapwork-view/mapwork-view.component';
import { AtlasCreationComponent } from './atlas/atlas-creation/atlas-creation.component';
import { MapworkConfigComponent } from './atlas-view/mapwork-config/mapwork-config.component';
import { UserManagementAtlasComponent } from './atlas-view/user-management-atlas/user-management-atlas.component';
import { PaletteComponent } from './common/palette/palette.component';
import { AuthGuard } from './common/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import {MatTreeModule} from '@angular/material/tree';
import { getAuthServiceConfigs } from './socialloginConfig';
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';
import { PerspectiveTreeComponent } from './mapwork-view/perspective-tree/perspective-tree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatSidenavModule} from '@angular/material';
import { DrawPerspectiveComponent } from './mapwork-view/draw-perspective/draw-perspective.component';
import { MapworkCreationComponent } from './atlas-view/mapwork-creation/mapwork-creation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SearchPipe } from './common/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AtlasComponent,
    AtlasListComponent,
    AtlasViewComponent,
    MapworkListComponent,
    MapworkViewComponent,
    AtlasCreationComponent,
    MapworkConfigComponent,
    UserManagementAtlasComponent,
    PaletteComponent,
    PerspectiveTreeComponent,
    DrawPerspectiveComponent,
    MapworkCreationComponent,
    SearchPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [AuthGuard, {provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
}],
  bootstrap: [AppComponent]
})

export class AppModule { }
