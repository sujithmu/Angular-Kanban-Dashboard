import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private API = 'http://localhost:3000/data';

    constructor(private _http:HttpClient) {}

    getData() {
        return this._http.get<Task[]>(this.API);
    }

    addData(data: any) {
        return this._http.post(this.API, this.addData,data);
    }
}