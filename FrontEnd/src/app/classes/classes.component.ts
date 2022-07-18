import { HttpClient, HttpEventType, HttpErrorResponse, HttpProgressEvent, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';  
import { ClassService } from '../_services/class.service'; 
import { CUnitComponent } from '../cunit/cunit.component'; 
import { curricular_unit } from '../class.model';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Validators } from '@angular/forms';
import { ECOMP } from '../courses.model';

const API_HOST = 'https://localhost:7275/';
const httpOptions = {
  headers: new HttpHeaders({ ContentType: 'application/json' }),
};

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  isCreate: boolean = false;
  progress: number = 0;
  message: string = "";
  response: string = "";
  cunit!: curricular_unit;
  name: string = "";
  prereq: string = "";
  classes: string[] = [];
  user_id!: string;
  courseForm = this.fb.group({
    specific_course: ['ECOMP', [Validators.required]],
  });
  currentCourse: string = "";
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, public fb: FormBuilder) { 
  }
  ngOnInit() {
    this.getClasses();
  }
  uploadFile = (files: FileList | null = null) => {
    if (files != null) {
      if (files.length === 0) {
        return;
      }
      const token = this.tokenStorage.getToken();
      if (token != null) {
        this.user_id = token;
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        
        this.http.post(API_HOST+'File/'+this.user_id, formData, {reportProgress: true, observe: 'events'})
          .subscribe({
            next: (event) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / (event.total || 100));
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.onUploadFinished.emit(event.body);
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
      }
    }
  }
  uploadFinished = (event: HttpErrorResponse) => { 
    this.response = event.message; 
  }

  private getClasses = () => {
    const token = this.tokenStorage.getToken();
    if (token != null) {
      this.user_id = token;
      this.http.get(API_HOST+this.user_id)
      .subscribe({
        next: (res) => {
          this.classes = res as string[];
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
    }
  }

  onCreate = () => {
    this.cunit = {
      UC: this.name,
    }
    console.log(this.name);
    const token = this.tokenStorage.getToken();
      if (token != null) {
        this.user_id = token;
        this.http.post(API_HOST+'UC/'+this.user_id, this.cunit, {responseType: 'text'}).subscribe({
          next: _ => {
            this.getClasses();
            this.isCreate = false;
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
      }
  }

  returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.prereq = '';
  }

  updateCourse (e: any) {
    this.specific_course?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get specific_course() {
    return this.courseForm.get('specific_course');
  }

  submitCourse(): void {
    this.currentCourse = this.specific_course?.value.stringify;
  }

  courseDone(course: string) {
    var i: number;
    for (i = 0; i < this.classes.length; i++) {
      if (this.classes[i] === course) {
        return true;
      }
    }
    return false;
  }

  coursePossible(course: string) {
    var i: number;
    var j: number;
    var prereqs: string[] = ["", "", ""];
    var possible: boolean = true;
    var found: boolean[] = [false, false, false];
    if (this.currentCourse === 'ECOMP') {
      for (i = 0; i < ECOMP.length; i++) {
        if (ECOMP[i].name == course) {
          prereqs = ECOMP[i].prereqs;
          break;
        }
      }
    }
    for (i = 0; i < this.classes.length; i++) {
      for (j = 0; j < 3; j++) {
        if (this.classes[i] === prereqs[j]) {
          found[j] = true;
        }
      }
    }
    for (i = 0; i < 3; i++) {
      if (found[i] != true) {
        possible = false;
      }
    }
    if (possible) {
      return true;
    }
    return false;
  }
}
/* https://code-maze.com/upload-files-dot-net-core-angular/ */