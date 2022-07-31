import { HttpClient, HttpEventType, HttpErrorResponse, HttpProgressEvent, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';  
import { ClassService } from '../_services/class.service'; 
import { CUnitComponent } from '../cunit/cunit.component'; 
import { curricular_unit } from '../class.model';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Validators } from '@angular/forms';
import { course, ECOMP, CCOMP } from '../courses.model';

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
  classes: curricular_unit[] = [];
  classes_unavailable: curricular_unit[] = [];
  user_id!: string;
  courseForm = this.fb.group({
    specific_course: ['ECOMP', [Validators.required]],
  });
  clList: string[] = [];
  currentCourse: string = "";
  currCourseNum: number = 0;
  backResponse: string = "";
  ECOMP: course[] = ECOMP;
  CCOMP: course[] = CCOMP;
  ECOMP_prereq: number[] = [];
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, public fb: FormBuilder) { 
  }
  ngOnInit() {
    this.currentCourse = "ECOMP";
    this.getClasses();
  }

  changeCourse() {
    switch (this.currCourseNum) {
      case 0:
        this.currCourseNum = 1;
        this.currentCourse = "CCOMP";
        break;
      case 1:
        this.currCourseNum = 0;
        this.currentCourse = "ECOMP";
        break;
    }
    this.ECOMP_prereq = [];
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

  private checkPreReq = (i: number) => {
    if (this.currCourseNum == 0) {
      if (i >= this.ECOMP.length) {
        return;
      }
      this.cunit = {
        uc: ECOMP[i].name,
      }
    }
    else if (this.currCourseNum == 1) {
      if (i >= this.CCOMP.length) {
        return;
      }
      this.cunit = {
        uc: CCOMP[i].name,
      }
    }
    this.http.post(API_HOST+'Prereq/'+this.user_id, this.cunit, {responseType: 'text'})
    .subscribe({
      next: (res) => {
        if (res == 'Usuário já tem essa matéria') {
          this.ECOMP_prereq.push(2);
        }
        else if (res == 'Usuário tem os pré-requisitos para fazer essa matéria') {
          this.ECOMP_prereq.push(1);
        }
        else {
          this.ECOMP_prereq.push(0);
        }
        console.log(i + " " + this.cunit.uc)
        this.checkPreReq(i+1);
      },
      error: (err: HttpErrorResponse) => {
        console.log(this.cunit.uc)
        console.log(err +" "+err.error + " " + ECOMP[i - 1].name);
      }
    });
  }

  private getClasses = () => {
    var i = 0;
    var allObvs: Observable<{}>[] = [];
    const token = this.tokenStorage.getToken();
    if (token != null) {
      this.user_id = token;
      this.http.get(API_HOST+'UcsUser/'+this.user_id)
      .subscribe({
        next: (res) => {
          this.classes = res as curricular_unit[];
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
      this.checkPreReq(0);
    }
  }

  hasUC(e: any): boolean {
    this.http.post(API_HOST+'Prereq/'+this.user_id, this.cunit, {responseType: 'text'}).subscribe({
      next: (res) => {
        if (res == 'Usuário já tem essa matéria') {
          return true;
        }
        return false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
    return false;
  }

  hasPrereq(e: any): boolean {
    this.http.post(API_HOST+'Prereq/'+this.user_id, this.cunit, {responseType: 'text'}).subscribe({
      next: (res) => {
        if (res == 'Usuário tem os pré-requisitos para fazer essa matéria') {
          return true;
        }
        return false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
    return false;
  }

  private getClassList = () => {
    const token = this.tokenStorage.getToken();
    if (token != null) {
      this.user_id = token;
      this.http.get(API_HOST+'UCs')
      .subscribe({
        next: (res) => {
          this.clList = res as string[];
          this.name = this.clList[0];
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
    }
  }

  onCreate = () => {
    this.cunit = {
      uc: this.name,
    }
    console.log(this.name);
    const token = this.tokenStorage.getToken();
    if (token != null) {
      this.user_id = token;
      this.http.post(API_HOST+'Prereq/'+this.user_id, this.cunit, {responseType: 'text'}).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res == 'Usuário tem os pré-requisitos para fazer essa matéria') {
            this.http.post(API_HOST+'UCadd/'+this.user_id, this.cunit, {responseType: 'text'}).subscribe({
              next: (res: any) => {
                this.getClasses();
                this.isCreate = false;
                console.log(res);
                this.backResponse = res;
              },
              error: (err: HttpErrorResponse) => {
                console.log(err);
                console.log(err.error);
                this.backResponse = err.error;
            }});
          }
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
          console.log(err.error);
          this.backResponse = err.error;
        }
      });
    }
  }

  returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.prereq = '';
    this.backResponse = '';
    this.getClassList();
  }

  updateClass(e: any) {
    this.name = e.target.value;
  }
}
/* https://code-maze.com/upload-files-dot-net-core-angular/ */