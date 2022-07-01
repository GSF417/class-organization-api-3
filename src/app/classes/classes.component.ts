import { HttpClient, HttpEventType, HttpErrorResponse, HttpProgressEvent, HttpEvent } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';  
import { ClassService } from '../_services/class.service'; 
import { CUnitComponent } from '../cunit/cunit.component'; 
import { curricular_unit } from '../class';
import { FormsModule } from '@angular/forms';

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
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  uploadFile = (files: FileList | null = null) => {
    if (files != null) {
      if (files.length === 0) {
        return;
      }
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      
      this.http.post('https://localhost:4200/api/classes', formData, {reportProgress: true, observe: 'events'})
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
  uploadFinished = (event: HttpErrorResponse) => { 
    this.response = event.message; 
  }

  private getClassess = () => {
    this.http.get('https://localhost:4200/api/classes')
    .subscribe({
      next: (res) => this.classes = res as curricular_unit[],
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  onCreate = () => {
    this.cunit = {
      Curr_Id: "0",
      Curr_Name: this.name,
      Curr_Prerequisites: this.prereq
    }
  }

  returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.prereq = '';
  }
}
/* https://code-maze.com/upload-files-dot-net-core-angular/ */