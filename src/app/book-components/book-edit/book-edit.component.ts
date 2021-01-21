import { Book } from './../../model/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BookApiService } from './../../service/book-api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthorApiService } from './../../service/author-api.service';
import { GenreApiService } from './../../service/genre-api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './../../service/toast.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  selectedBook: Book;
  submitted = false;
  editForm: FormGroup;
  Author: any;
  Genre: any;


  constructor(
    public modal: NgbActiveModal,
    public fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private bookApi: BookApiService,
    private authorApi: AuthorApiService,
    private genreApi: GenreApiService,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.readAuthor();
    this.readGenre();
    this.updateBook();
    /*let id = this.actRoute.snapshot.paramMap.get('id');
    this.getBook(id);
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      genre: ['', [Validators.required]],
    })*/
  }

  //getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  /*getBook(id) {
    this.bookApi.getBook(id).subscribe(data => {
      //console.log(data);
      this.editForm.setValue({
      title: data.book['title'],
      author: data.book.author['id'],
      summary: data.book['summary'],
      isbn: data.book['isbn'],
      genre: data.book.genre[0]['id'],
      });
    });
  }*/

  updateBook() {
    console.log(this.selectedBook);
    this.editForm = this.fb.group({
      id: [this.selectedBook.id],
      title: [this.selectedBook.title, [Validators.required]],
      author: [this.selectedBook.author.id, [Validators.required]],
      summary: [this.selectedBook.summary, [Validators.required]],
      isbn: [this.selectedBook.isbn, [Validators.required]],
      genre: [this.selectedBook.genre[0].id, [Validators.required]],
    })
  }


  //toast for update
  showSuccess() {
    this.toastService.show('Updated successfuly', {
      classname: 'bg-success text-white',
      delay: 2000 ,
      autohide: true
    });
  }

  onSubmit() {
    /*this.submitted = true;*/
    if (!this.editForm.valid || this.submitted) {
      return false;
    }
    this.submitted = true;
    this.bookApi.updateBook(this.editForm.value).subscribe(
      (res) => {
        this.submitted = false;
        this.modal.close('Yes');
        this.showSuccess();
      },
      (error) => {
        console.log(error)
      }
    )

    /*else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.bookApi.updateBook(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/books');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error);
          });
      };
    };*/
  };

  readAuthor() {
    this.authorApi.getAuthors().subscribe((data) => {
      this.Author = data;
      console.log(data);
    });
  };

  readGenre() {
    this.genreApi.getGenres().subscribe((data) => {
      this.Genre = data;
    });
  };


}
