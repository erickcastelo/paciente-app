import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class PaisServiceProvider {

    constructor(private _http: HttpClient) { }

    private _urlApi() {
        return 'http://localhost:8888/api/pais/';
    }

    public paises() {

        return this._http
            .get(this._urlApi() + 'paises')
            .catch(err => Observable.of(new Error('Falha na listagem de Países!')))
    }

}
