import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NavLifecycles} from "../../helpers/ionic/nav/nav-lifecycles";
import {PaisServiceProvider} from "../../providers/pais-service/pais-service";
import {Pais} from "../../models/pais";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Paciente} from "../../models/paciente";
import {PacienteServiceProvider} from "../../providers/paciente-service/paciente-service";
import {ConfirmPassword} from "../../helpers/validations/confirm-password";


@IonicPage()
@Component({
    selector: 'page-cadastro',
    templateUrl: 'cadastro.html',
})
export class CadastroPage implements NavLifecycles{

    public form: FormGroup;
    public paciente: Paciente;
    public paises: Pais[];

    private alerta: any;
    public erros = [];
    public erro = false;
    masks: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        private _servicePais: PaisServiceProvider,
        private _alertCtrl: AlertController,
        private _loadingCtrl: LoadingController,
        private _servicePaciente: PacienteServiceProvider) {

        this.validations();

        this.inicializadorObjeto();
    }

    ionViewDidLoad() {

        this.listCountrys();
    }

    private inicializadorObjeto() {

        this.paciente = {
            codpais: null,
            cpf: '',
            rg: '',
            nome: '',
            datanascimento: new Date().toISOString(),
            fone: '',
            email: '',
            senha: '',
            confirmPassword: ''
        }as Paciente;
    }

    private listCountrys() {
        this._servicePais
            .paises()
            .subscribe(
                (paises: Pais[]) => {
                    this.paises = paises;
                },
                (err: Error) => console.log(err.message)
            )
    }

    private validations(): void {
        this.form = this.fb.group({
            codpais: [''],
            cpf: ['', Validators.compose([
                Validators.required,
            ])],
            rg: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(13)
            ])],
            nome: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(90)
            ])],
            datanascimento: [''],
            fone: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(9)
            ])],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.maxLength(60)
            ])],
            senha: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: ConfirmPassword.confirmPassword
        });
    }

    public submeter(event) {

        let loading = this._loadingCtrl.create({
            content: 'Processando os dados...'
        });

        loading.present();

        let datanascimento = new Date(this.paciente.datanascimento);
        let numero = `${datanascimento.getFullYear()}-${this.paciente.cpf}-PA`;
        this.paciente.numero = numero;

        this.alerta = this._alertCtrl.create({
            title: 'Aviso',
            buttons: [
                {
                    text: 'ok'
                }
            ]
        });

        let mensagem = '';

        this._servicePaciente
            .create(this.paciente)
            .finally(() => {
                this.alerta.setSubTitle(mensagem);
                this.alerta.present();
                loading.dismiss();
            })
            .subscribe(paciente => {
                console.log(paciente);
                mensagem = 'Cadastro realizado com sucesso!!';
                this.inicializadorObjeto();

            },(err: any) => {
                console.log(err);
                mensagem = err.statusText;

                err.error.forEach(item => {
                    this.erros[item.field] = item.message;
                });
                this.erro = true;
            })
    }

    public validacoes(atributo: string, value: string): void {
        value.length > 0 ? this.erro = false : !this.form.controls[atributo].invalid;
    }
}

