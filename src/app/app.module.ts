import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./includes/header/header.component";
import {FooterComponent} from "./includes/footer/footer.component";
import {CookiesComponent} from "./includes/cookies/cookies.component";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CookiesComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule

    ],
    providers: [],
    exports: [
        HttpClientModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
