import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  constructor(private httpClient: HttpClient) { }
  buscaCep(cep:any){
return this.httpClient.get(`//viacep.com.br/ws/${cep}/json/`)
  }
}
