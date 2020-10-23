import { Injectable } from '@angular/core';
import { HttpClient, } from "@angular/common/http";
import { categoryInterface } from './interface.service';
import { Observable } from 'rxjs';

@Injectable()
export class DbService {
  apiKey:string = "e8067b53";
  constructor(private httpClient: HttpClient) { }

  getFilm(film: string): Observable<categoryInterface[]> {
    if (!film) {
      return
    }
    return this.httpClient.get<categoryInterface[]>('http://www.omdbapi.com/?s=' + film + '&apikey=' + this.apiKey);
  }
  searchId(id: string): Observable<categoryInterface[]> {
    if (!id) {
      return
    }
    return this.httpClient.get<categoryInterface[]>('http://www.omdbapi.com/?i=' + id + '&apikey=' + this.apiKey);
  }
}