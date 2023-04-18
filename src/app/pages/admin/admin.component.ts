import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private userSerivce: UserService) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.forAdmin();
  }

  forAdmin() {
    console.log('forAdmin in admin route just triggered!');
    this.userSerivce.forAdmin().subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
      },
      error: (error: any) => {
        console.log('Error when call forAdmin method :>> ', error);
      },
    });
  }
}
