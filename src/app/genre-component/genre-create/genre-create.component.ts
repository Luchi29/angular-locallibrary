import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GenreApiService } from './../../service/genre-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent implements OnInit {

  submitted = false;
  genreForm: FormGroup;


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private NgZone: NgZone,
    private genreApi: GenreApiService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.genreForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  // getter to access form control
  get myForm() {
    return this.genreForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.genreForm.valid) {
      return false;
    } else {
      this.genreApi.createGenre(this.genreForm.value).subscribe(
        (res) => {
          console.log('Genre successfully created!')
          this.NgZone.run(() => this.router.navigateByUrl('/genres'))
        }, (error) => {
          console.log(error);
        });


    }
  }

}
