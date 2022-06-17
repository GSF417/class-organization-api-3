import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
})
export class CUnitComponent implements OnInit {
  content?: string = 'Classes Completed: link Classes Suggested: link';
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    
  }
}
