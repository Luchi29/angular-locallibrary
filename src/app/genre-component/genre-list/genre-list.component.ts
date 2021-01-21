import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/model/genre';
import { GenreApiService } from '../../service/genre-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GenreEditComponent } from './../../genre-component/genre-edit/genre-edit.component';

import { ToastService } from './../../service/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  Genre:any = [];
  genre: Genre;

  constructor(
    private genreApi: GenreApiService,
    public modalService: NgbModal,
    public toastService: ToastService
    ) {
    this.readGenre();
  }

  ngOnInit(): void {}

  readGenre() {
    this.genreApi.getGenres().subscribe((data) => {
      this.Genre = data;
      console.log(data);
    });
  };

  //update genre modal
  editGenre(genre: Genre) {

    const ref = this.modalService.open(GenreEditComponent, { centered: true });
    ref.componentInstance.selectedGenre = genre;

    ref.result.then((yes) => {
      console.log('Yes Click');

      this.readGenre();
    },
    (cancel) => {
      console.log('Cancel Click');
    });

  }

  showDelete() {
    this.toastService.show('deleted! successfuly ', {
      classname: 'bg-danger text-white',
      delay: 2000 ,
      autohide: true
    });
  }


  removeGenre(genre, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.genreApi.deleteGenre(genre.id).subscribe((data) => {
          this.Genre.splice(index, 1);
          this.showDelete();
        });
      }
    })
  };

};
