import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {String} from "typescript-string-operations";

export class BaseService<T> {

    private port: string = '8888';
    private api: string = '/api/';
    private protocal: string = location.protocol;
    private hostname = 'localhost';
    protected urlBase: string;
    protected fullUrl: string;
    protected headers = new HttpHeaders();
    protected parameters: HttpParams = new HttpParams();


    constructor(protected _http: HttpClient, path: string) {

        this.urlBase = String.Format("{0}//{1}:{2}{3}", this.protocal, this.hostname, this.port, this.api);
        this.fullUrl = String.Format("{0}{1}", this.urlBase, path);
    }

    private get token() {

        const token = localStorage.getItem('api-token') !== null ?
            localStorage.getItem('api-token') : null;

        return token;
    }

    public addParameter(key: string, value: string): void {
        this.parameters = this.parameters.append(key, value);
    }


    protected addOptions(parameters?: HttpParams): any {
        const httpOptions = {};

        if (this.token !== null) {
            this.headers = this.headers.set("Authorization", "Bearer " + this.token);
        }

        httpOptions["headers"] = this.headers;

        if (parameters) {
            httpOptions["params"] = parameters;
        }


        return httpOptions;
    }

    public getAll(): Observable<T> {

        return this._http
            .get<T>(this.fullUrl + '/index', this.addOptions(this.parameters))
            .map(results => results)
    }

    public create(entity: T): Observable<T> {
        return this._http
            .post(this.fullUrl + '/create', entity, this.addOptions(this.parameters))
            .map(result => result)
    }

    // public update(entity: T): Observable<T> {
    //     const headers = this.headers;
    //
    //     return this._http
    //         .patch()
    // }
}