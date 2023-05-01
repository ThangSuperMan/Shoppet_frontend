import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  pageNumber: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit of NavigationComponent');
  }

  handleClickPagination(): void {
    console.log('handleClickPagination');
    this.pageNumber = 2;
    this.router.navigate(['/shop'], {
      queryParams: { pageNumber: this.pageNumber },
    });
  }
}
