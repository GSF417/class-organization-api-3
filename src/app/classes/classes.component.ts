import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { ClassService } from '../_services/class.service'; 
import { CUnitComponent } from '../cunit/cunit.component'; 
import { curricular_unit } from '../class';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  fileName = '';
  dataSaved = false;
  cunitIdUpdate = null;  
  allCUnits: Observable<curricular_unit[]>;  
  classForm: any;

  constructor(private http: HttpClient, private formbuilder: FormBuilder, private classService: ClassService) {}

  ngOnInit() {
    this.classForm = this.formbuilder.group ({
      ClassName: [''],
      ClassPreReqs: ['']
    });
    this.loadAllCUnits();
  }

  onFileSelected(event: any)  {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      const upload$ = this.http.post('/api/thumbnail-upload', formData);

      upload$.subscribe();
    }
  }

  onFormSubmit() {
    const c_unit = this.classForm.value;

  }

  loadAllCUnits() {  
    this.allCUnits = this.classService.getAllCUnits();  
  }  

  CreateEmployee(cunit: curricular_unit) {  
    if (this.cunitIdUpdate == null) {  
      this.classService.createCUnit(cunit).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.loadAllCUnits();  
          this.cunitIdUpdate = null;  
          this.classForm.reset();  
        }  
      );  
    } else {  
      cunit.Curr_Id = this.cunitIdUpdate;  
      this.classService.updateCUnit(cunit).subscribe(() => {  
        this.dataSaved = true;  
        this.loadAllCUnits();  
        this.cunitIdUpdate = null;  
        this.classForm.reset();  
      });  
    }  
  }   

  resetForm() {  
    this.classForm.reset();  
  }  
}
