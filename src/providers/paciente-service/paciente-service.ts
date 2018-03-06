import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PacienteServiceProvider {

    constructor(private _http: HttpClient) { }

    private _url() {
        return 'http://localhost:8888/api/paciente/'
    }

    public cadastrar(paciente) {

        return this._http
            .post(this._url() + 'inserir', paciente)
    }
}
