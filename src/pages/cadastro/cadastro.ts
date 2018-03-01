import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NavLifecycles} from "../../helpers/ionic/nav/nav-lifecycles";
import {PaisServiceProvider} from "../../providers/pais-service/pais-service";
import {Pais} from "../../models/pais";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Paciente} from "../../models/paciente";
import {PacienteServiceProvider} from "../../providers/paciente-service/paciente-service";


@IonicPage()
@Component({
    selector: 'page-cadastro',
    templateUrl: 'cadastro.html',
})
export class CadastroPage implements NavLifecycles{

    public form: FormGroup;
    public paciente: Paciente;
    public paises: Pais[];

    public numero: string;
    public codpais: number;
    public cpf: string;
    public rg: string;
    public nome: string = '';
    public datanascimento: string = '';
    public fone: string = '';
    public email: string = '';
    public senha: string = '';
    public confirmPassword: string = '';

    private alerta: any;
    public erros = [];
    public erro = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        private _servicePais: PaisServiceProvider,
        private _alertCtrl: AlertController,
        private _loadingCtrl: LoadingController,
        private _servicePaciente: PacienteServiceProvider) {

        this.validations();
    }

    ionViewDidLoad() {

        this.listCountrys();
    }

    private listCountrys() {
        this._servicePais
            .paises()
            .subscribe(
                (paises: Pais[]) => {
                    this.paises = paises;
                    console.log(paises);
                },
                (err: Error) => console.log(err.message)
            )
    }

    private validations(): void {
        this.form = this.fb.group({
            codpais: [''],
            cpf: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(11)
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
        });
    }

    public submeter(event) {

        let loading = this._loadingCtrl.create({
            content: 'Processando os dados...'
        });

        loading.present();

        let datanascimento = new Date(this.datanascimento);
        this.numero = `${datanascimento.getFullYear()}-${this.cpf}-PA`;

        this.paciente = {
            numero: this.numero,
            codpais: this.codpais,
            cpf: this.cpf,
            rg: this.rg,
            nome: this.nome,
            datanascimento: this.datanascimento,
            fone: this.fone,
            email: this.email,
            senha: this.senha,
            confirmPassword: this.confirmPassword
        };

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
            .cadastrar(this.paciente)
            .finally(() => {
                this.alerta.setSubTitle(mensagem);
                this.alerta.present();
                loading.dismiss();
            })
            .subscribe(paciente => {
                console.log(paciente);
                mensagem = 'Cadastro realizado com sucesso!!';

            },(err: any) => {
                console.log(err);
                mensagem = err.message;

                err.error.forEach(item => {
                    this.erros[item.field] = item.message;
                });
                this.erro = true;
            })
    }
}

