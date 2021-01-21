import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenreCreateComponent } from '../app/genre-component/genre-create/genre-create.component';
import { GenreEditComponent } from '../app/genre-component/genre-edit/genre-edit.component';
import { GenreListComponent } from '../app/genre-component/genre-list/genre-list.component';

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

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'catalog' },
  { path: 'catalog', component: CatalogComponentComponent },
  { path: 'genre/create', component: GenreCreateComponent },
  { path: 'genre/:id', component: GenreEditComponent },
  { path: 'genres', component: GenreListComponent },
  { path: 'author/create', component: AuthorCreateComponent },
  { path: 'author/:id', component: AuthorEditComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'book/create', component: BookCreateComponent },
  { path: 'book/:id', component: BookEditComponent },
  { path: 'books', component: BookListComponent },
  { path: 'bookinstance/create', component: BookinstanceCreateComponent },
  { path: 'bookinstance/:id', component: BookinstanceEditComponent },
  { path: 'bookinstances', component: BookinstanceListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
