import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  pageNumber: number = 1;
  currentActivePageNumber: number = 1;
  @Input() totalPages: number | undefined;

  constructor(
    private logger: NgxFancyLoggerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit of NavigationComponent');
    this.route.queryParams.subscribe((params) => {
      const pageNumber: number = params['pageNumber'];
      this.logger.info(`pageNumber: ${pageNumber}`);
    });
  }

  handleClickPagination(): void {
    console.log('handleClickPagination');
    this.pageNumber = 2;
    this.router.navigate(['/shop'], {
      queryParams: { pageNumber: this.pageNumber },
    });
    window.scroll(0, 0);
  }
}
