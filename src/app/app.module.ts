import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PaisServiceProvider } from '../providers/pais-service/pais-service';
import {HttpClientModule} from "@angular/common/http";

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

import { PacienteServiceProvider } from '../providers/paciente-service/paciente-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { IonicStorageModule } from '@ionic/storage';

import { GooglePlus } from "@ionic-native/google-plus";

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";

import { BrMaskerModule } from 'brmasker-ionic-3';

const config = {
    apiKey: "AIzaSyDiBc-Bb258Sry9ScqSWN589Un0E_fQDN0",
    authDomain: "prontuario-e4102.firebaseapp.com",
    databaseURL: "https://prontuario-e4102.firebaseio.com",
    projectId: "prontuario-e4102",
    storageBucket: "",
    messagingSenderId: "613815492243"
};

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        BrMaskerModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    PaisServiceProvider,
    PacienteServiceProvider,
    LoginServiceProvider,
        GooglePlus
    ]
})
export class AppModule {}
