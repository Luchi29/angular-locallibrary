import { Component, OnInit } from '@angular/core';
import { BookApiService } from './../service/book-api.service';

@Component({
  selector: 'app-catalog-component',
  templateUrl: './catalog-component.component.html',
  styleUrls: ['./catalog-component.component.css']
})
export class CatalogComponentComponent implements OnInit {

  Catalog: any = {};

  constructor(private bookApi: BookApiService) {
    this.readCatalog();
  }

  ngOnInit(): void {
  }

  readCatalog() {
    this.bookApi.getIndex().subscribe((data) => {
      this.Catalog = data;
      console.log(data)
    });
  };

}
