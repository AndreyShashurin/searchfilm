import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DbService } from '../db.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  response: any;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  
  
  constructor(
    public service: DbService,
    private router: Router
  ) {
    this.response = []
  }

  ngOnInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      ,filter(res => res.length > 4)
      ,distinctUntilChanged()
    ).subscribe((text: string) => {
      this.service.getFilm(text).subscribe((res) => {
        this.response = res;
      }, (err) => {
        console.error('error', err);
      });

    });
  }
  
  getClick(data: string) {
    this.router.navigate(['/movie'],{ queryParams: {id: data}});
  }
}
