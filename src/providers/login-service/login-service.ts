import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoginForm} from "../../models/login-form";
import {BaseService} from "../base-service";

@Injectable()
export class LoginServiceProvider extends BaseService{

    constructor(protected _http: HttpClient) {
        super(_http, "paciente")
    }

    public login(loginForm: LoginForm) {

        return this._http
            .post(this.fullUrl + "/login", loginForm)
            .do((result) =>  localStorage.setItem("api-token", result['accesstoken']))
    }
}

