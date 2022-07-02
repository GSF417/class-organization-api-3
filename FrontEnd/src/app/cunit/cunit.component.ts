import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-cunit',
  templateUrl: './cunit.component.html',
  styleUrls: ['./cunit.component.css'],
})
export class CUnitComponent implements OnInit {
  content?: string = 'Classes Completed: link Classes Suggested: link';
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    
  }
}
