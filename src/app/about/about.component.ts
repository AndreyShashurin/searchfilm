import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DbService } from '../db.service';
import { categoryInterface } from '../interface.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  film: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: DbService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
        let id = params.id;
        this.db.searchId(id).subscribe(complite => {
          this.film = complite
        }, error => console.error())
      });
  }

}
