import { Component, OnInit } from '@angular/core';
import { Genre } from './../../model/genre';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreApiService } from './../../service/genre-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './../../service/toast.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css'],
})
export class GenreEditComponent implements OnInit {

  selectedGenre: Genre;
  submitted = false;
  editForm: FormGroup;
  genreData: Genre[];

  constructor(
    public modal: NgbActiveModal,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private genreApi: GenreApiService,
    private router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.updateGenre();
    /*let id = this.actRoute.snapshot.paramMap.get('id');
    this.getGenre(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]]
    })*/
  }

  //getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  /*getGenre(id) {
    this.genreApi.getGenre(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
      });
    });
  }*/

  updateGenre() {
    this.editForm = this.fb.group({
      id: [this.selectedGenre.id],
      name: [this.selectedGenre.name, [Validators.required]],
    });
  }

  //toast
  showSuccess() {
    this.toastService.show('Updated successfuly', {
      classname: 'bg-success text-white',
      delay: 2000 ,
      autohide: true
    });
  }


  onSubmit() {
    if (!this.editForm.valid || this.submitted) {
      return false;
    }
    this.submitted = true;
    this.genreApi.updateGenre(this.editForm.value).subscribe(
      (res) => {
        this.submitted = false;
        this.modal.close('Yes');
        this.showSuccess();
        console.log('update');
      },
      (error) => {
        console.log(error);
      }
    );

    /*else {
        this.submitted = true;
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.genreApi.updateGenre(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/genres-list');
            console.log('Content updated successfully!')
            x => {
            this.submitted = false;
            this.modal.close('Yes');
            }
          }, (error) => {
            console.log(error)
          });

    };*/
  }
}
