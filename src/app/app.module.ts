import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenreCreateComponent } from './genre-component/genre-create/genre-create.component';
import { GenreEditComponent } from './genre-component/genre-edit/genre-edit.component';
import { GenreListComponent } from './genre-component/genre-list/genre-list.component';

import { GenreApiService } from './service/genre-api.service';
import { AuthorApiService } from './service/author-api.service';
import { BookApiService } from './service/book-api.service';
import { BookinstanceApiService } from './service/bookinstance-api.service';

import { AuthorCreateComponent } from './author-component/author-create/author-create.component';
import { AuthorEditComponent } from './author-component/author-edit/author-edit.component';
import { AuthorListComponent } from './author-component/author-list/author-list.component';
import { BookCreateComponent } from './book-components/book-create/book-create.component';
import { BookEditComponent } from './book-components/book-edit/book-edit.component';
import { BookListComponent } from './book-components/book-list/book-list.component';
import { BookinstanceCreateComponent } from './bookinstance-components/bookinstance-create/bookinstance-create.component';
import { BookinstanceEditComponent } from './bookinstance-components/bookinstance-edit/bookinstance-edit.component';
import { BookinstanceListComponent } from './bookinstance-components/bookinstance-list/bookinstance-list.component';
import { CatalogComponentComponent } from './catalog/catalog-component.component';

import { ToastComponent } from './toast/toast.component';


@NgModule({
  declarations: [
    AppComponent,
    GenreCreateComponent,
    GenreEditComponent,
    GenreListComponent,
    AuthorCreateComponent,
    AuthorEditComponent,
    AuthorListComponent,
    BookCreateComponent,
    BookEditComponent,
    BookListComponent,
    BookinstanceCreateComponent,
    BookinstanceEditComponent,
    BookinstanceListComponent,
    CatalogComponentComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    DataTablesModule
  ],
  providers: [
    GenreApiService,
    AuthorApiService,
    BookApiService,
    BookinstanceApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
