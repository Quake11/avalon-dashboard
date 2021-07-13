import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { environment } from "src/environments/environment";
import { AppComponent } from "./app.component";
import { DirectivesModule } from "./directives/directives.module";
import { AppRoutingModule } from "./routing/app-routing.module";




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    BrowserAnimationsModule, // imports firebase/storage only needed for storage features
    MatProgressSpinnerModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, () => 'avalon_dashboard', {
      authGuardFallbackURL: "/login"
    }),
    DirectivesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
