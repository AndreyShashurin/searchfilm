import { Injectable } from '@angular/core';

export interface categoryInterface {
    Title: number,
    Type?: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string[],
    Director: string,
    Writer: string[],
    Actors: string[],
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Ratings: [{
        Source:string,
        Value: string
    }],
    Metascore: string,
    imdbRating: number,
    imdbVotes: number,
    imdbID: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: boolean
}

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {
  constructor() { }
}