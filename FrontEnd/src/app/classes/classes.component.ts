import { HttpClient, HttpEventType, HttpErrorResponse, HttpProgressEvent, HttpEvent } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';  
import { ClassService } from '../_services/class.service'; 
import { CUnitComponent } from '../cunit/cunit.component'; 
import { curricular_unit } from '../class';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';

const API_HOST = 'http://localhost:7275/';

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
  user_id: number = 0;
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { 
  }
  ngOnInit() {
  }
  uploadFile = (files: FileList | null = null) => {
    if (files != null) {
      if (files.length === 0) {
        return;
      }
      this.user_id = this.tokenStorage.getUser();
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      
      this.http.post(API_HOST+'/UC/'+this.user_id, formData, {reportProgress: true, observe: 'events'})
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

  private getClasses = () => {
    this.user_id = this.tokenStorage.getUser();
    this.http.get(API_HOST+'/'+this.user_id)
    .subscribe({
      next: (res) => this.classes = res as curricular_unit[],
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  onCreate = () => {
    this.cunit = {
      Curr_Name: this.name,
    }
  }

  returnToCreate = () => {
    this.isCreate = true;
    this.name = '';
    this.prereq = '';
  }
}
/* https://code-maze.com/upload-files-dot-net-core-angular/ */