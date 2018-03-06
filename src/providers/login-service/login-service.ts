import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginForm} from "../../models/login-form";
// import {Headers, RequestOptions} from "@angular/http";
import {Storage} from "@ionic/storage";
import {AngularFireAuth} from "angularfire2/auth";
import {GooglePlus} from "@ionic-native/google-plus";
import * as firebase from "firebase/app";

@Injectable()
export class LoginServiceProvider {

    constructor(
        private _http: HttpClient,
        private storage: Storage,
        private angularFireAuth: AngularFireAuth,
        private googlePlus: GooglePlus) { }

    private _url() {
        return 'http://localhost:8888/api/paciente/';
    }

    private get headers() {

        let token: string = '';

        this.storage
            .get('api-token')
            .then(token => token);

        return new HttpHeaders({
            'Content-Type': 'application/json',
            "Authorization": token
        })
    }

    public login(loginForm: LoginForm) {

        return this._http
            .post(this._url() + 'login', loginForm)
            .do((result) => this.storage.set('api-token', result['accesstoken']))
    }

    public signWithGoogle() {

        return this.googlePlus
            .login({
                webClientId: '95032453732-o0nf1frr627tg044qrte5p6cbtuooeqp.apps.googleusercontent.com',
                offline: true
            })
            .then(res => {
                return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                    .then((user: firebase.User) => {
                        return user.updateProfile({
                            displayName: res.displayName,
                            photoURL: res.imageURL
                        })
                    })
            })
    }

    signOut() {

        let length = this.angularFireAuth.auth.currentUser.providerData.length;

        if (length) {
            for (let i = 0; i < length; i++) {
                let provider = this.angularFireAuth.auth.currentUser.providerData[i];

                if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                    return this.googlePlus.disconnect()
                        .then(() => {
                            return this.signOut();
                        })
                }
            }
        }

        return this.signOut();
    }

    public listPacientes() {

        let headers = this.headers;

        return this._http
            .get(this._url() + 'list-pacientes', { headers });
    }

}

