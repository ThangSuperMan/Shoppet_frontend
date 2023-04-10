import { Component } from '@angular/core';
import { getAllProducts } from '@api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  ngOnInit(): void {
    // getAllProducts();
  }
}
