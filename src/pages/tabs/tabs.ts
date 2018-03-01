import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import {CadastroPage} from "../cadastro/cadastro";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage{

    public tabs = [];

    constructor() {


        this.tabs = [
            { component: HomePage, title: 'Home', icon: 'home'},
            { component: AboutPage, title: 'About', icon: 'information-circle'},
            { component: CadastroPage.name, title: 'Cadastro', icon: 'contacts'},
        ];
    }
}