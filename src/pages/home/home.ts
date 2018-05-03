import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {PacienteServiceProvider} from "../../providers/paciente-service/paciente-service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private servicePaciente: PacienteServiceProvider) {

        this.servicePaciente.addParameter("sort", "nome");

        this.servicePaciente
            .getAll()
            .subscribe(results => {
                console.log(results);
            }, error => console.log(error))
    }

}

