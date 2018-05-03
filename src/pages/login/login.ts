import { Component } from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {LoginForm} from "../../models/login-form";
import {LoginServiceProvider} from "../../providers/login-service/login-service";
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public loginForm: LoginForm;

    public form: FormGroup;

    public erros = [];
    public erro = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        private _loadingCtrl: LoadingController,
        private app: App,
        private _loginService: LoginServiceProvider) {

        this.loginForm = {
            email: '',
            password: '',
            tipoPessoa: 2
        };

        this.validations();
    }

    private validations() {

        this.form = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.required]
        });
    }

    public logar(): void {

        let loading = this._loadingCtrl.create({
            content: 'Processando dados...'
        });
        loading.present();

        this._loginService
            .login(this.loginForm)
            .finally(() => {
                loading.dismiss();
            })
            .subscribe(result => {
                this.app.getRootNav().setRoot(HomePage);
            }, err => {

                err.error.forEach(item => {
                    this.erros[item.field] = item.message;
                });
                this.erro = true;
            })
    }
}
