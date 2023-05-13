import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  constructor(private userSerivce: UserService) {}

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    console.log('forUser in user route just triggered!');
    this.userSerivce.forUser().subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
      },
      error: (error: any) => {
        console.log('Error when call forAdmin method :>> ', error);
      },
    });
  }
}
