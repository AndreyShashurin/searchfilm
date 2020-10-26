import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { fromEvent, Subscription } from 'rxjs';
import { map, filter, distinctUntilChanged, delay } from 'rxjs/operators';
import { DbService } from '../db.service';
import { categoryInterface } from '../interface.interface';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html', 
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchField: string;
  message: string;
  isSearching: boolean = false;
  openField: boolean = false;
  error: boolean = false;
  spiner: boolean = false;
  dataSource = new MatTableDataSource;
  displayedColumns: string[] = ['Poster', 'Title', 'Year'];
  response: categoryInterface[] = [];
  aSub: Subscription
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  
  constructor(
    private service: DbService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.aSub = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length > 4),
      distinctUntilChanged(),
    ).subscribe((text: string) => {
      this.spiner = true
      this.service.getFilm(text).pipe(  
        delay(1000)
      ).subscribe((res) => {
        this.spiner = false
        if(res['Search']) {
          this.response = res
          this.openField = true
          this.error = false
        } else {
          this.error = true
          this.openField = false      
          this.getTimeout('Фильм не найден')
        }
      },
      error => {
          this.spiner = false
          this.error = true
          this.getTimeout(error.message)
        }
      );
    });
  }

  search(data: string) {
    if(this.openField) {
      this.dataSource.data = this.response['Search'];
      this.openField = false
    } else {let newArray = this.response['Search'].filter(el => el.Title == data)
      this.dataSource.data = newArray;
    }
    this.isSearching = true;
  }
  
  getClick(data: string) {
    this.router.navigate(['/movie'],{ queryParams: {id: data}});
  }

  selectFilm(data) {
    this.searchField = data;
    this.openField = false
  }

  getTimeout(text: string) {
    this.message = text
    this.alert.error(text)
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      this.message = ''
      this.error = false
    }, this.alert.delay)
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
