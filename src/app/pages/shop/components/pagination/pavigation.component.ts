import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

interface PaginationItemProps {
  content: number;
  isActive: boolean;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Output() onLoadingChanged = new EventEmitter<boolean>();

  requireLoading() {
    const isLoading = true;
    this.onLoadingChanged.emit(isLoading);
  }

  insertedEtcOnce: boolean = false;
  paginationItems: PaginationItemProps[] = [
    {
      content: 1,
      isActive: true,
    },
    {
      content: 2,
      isActive: false,
    },
    {
      content: 3,
      isActive: false,
    },
  ];
  activePaginationItem: number = 1;
  @Input() pageNumber: number = 1;
  @Input() totalPages: number | undefined;
  @ViewChildren('button') buttons: QueryList<ElementRef> | undefined;

  constructor(
    private logger: NgxFancyLoggerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  handleRenderNextPagination(activePageNumber: number): void {
    const pageNumberTriggerAtThree = 3;
    const pageNumberTriggerAtFour = 4;
    this.activePaginationItem = activePageNumber;

    if (activePageNumber === pageNumberTriggerAtThree) {
      // Remove the pagination number five
      this.paginationItems = this.paginationItems.filter(
        (paginationItem: PaginationItemProps) => paginationItem.content !== 5
      );
      if (!this.isExistPageNumber(activePageNumber)) {
        const paginationItem: PaginationItemProps = {
          content: 4,
          isActive: false,
        };
        this.paginationItems.push(paginationItem);
      }
    } else if (activePageNumber === pageNumberTriggerAtFour) {
      const paginationItem: PaginationItemProps = {
        content: 5,
        isActive: false,
      };
      if (!this.isExistPageNumber(activePageNumber)) {
        this.paginationItems.push(paginationItem);
      }
    }

    const paginationItemTwo: PaginationItemProps | undefined =
      this.paginationItems.find(
        (paginationItem: PaginationItemProps) => paginationItem.content === 2
      );
    let isHavePaginationItemTwo: boolean = false;
    if (paginationItemTwo) {
      isHavePaginationItemTwo = true;
    }

    if (activePageNumber === 4 && !isHavePaginationItemTwo) {
      this.renderPaginationLayoutOne();
    }
    this.removeEtcElement();

    // Push etc element after the page number 1
    if (activePageNumber >= 5) {
      this.logger.header('activePageNumber >= 5');
      // Always keep the first item in the array
      const paginationItem: PaginationItemProps | undefined =
        this.paginationItems.find(
          (paginationItem: PaginationItemProps) => paginationItem.content === 1
        );

      if (paginationItem) {
        this.paginationItems = [paginationItem];
      }
      this.renderPaginationLayoutTwo(activePageNumber);
      this.renderEtcElement();
    }
  }

  renderPaginationLayoutOne(): void {
    this.paginationItems = [
      {
        content: 1,
        isActive: false,
      },
      {
        content: 2,
        isActive: false,
      },
      {
        content: 3,
        isActive: false,
      },
      {
        content: 4,
        isActive: true,
      },
      {
        content: 5,
        isActive: false,
      },
    ];
  }

  renderPaginationLayoutTwo(activePageNumber: number): void {
    this.paginationItems.push({
      content: activePageNumber - 1,
      isActive: false,
    });
    this.paginationItems.push({
      content: activePageNumber,
      isActive: true,
    });
    this.paginationItems.push({
      content: activePageNumber + 1,
      isActive: false,
    });
  }

  handleClickPaginationOne(activePageNumber: number): void {
    if (activePageNumber === 1) {
      this.paginationItems = [
        {
          content: 1,
          isActive: true,
        },
        {
          content: 2,
          isActive: false,
        },
        {
          content: 3,
          isActive: false,
        },
      ];
    }
  }

  handleGotoPreviousPage(): void {
    console.log('handleGotoPreviousPage');
    // 5 -> 4
    if (this.activePaginationItem == 5) {
      this.removeEtcElement();
      this.paginationItems = [
        {
          content: 1,
          isActive: true,
        },
        {
          content: 2,
          isActive: false,
        },
        {
          content: 3,
          isActive: false,
        },
        {
          content: 4,
          isActive: true,
        },
        {
          content: 5,
          isActive: false,
        },
      ];
    } else if (this.activePaginationItem >= 6) {
      const paginationItem: PaginationItemProps | undefined =
        this.paginationItems.find(
          (paginationItem: PaginationItemProps) => paginationItem.content === 1
        );

      // Reset array
      if (paginationItem) {
        this.paginationItems = [paginationItem];
      }

      this.renderPaginationLayoutTwo(this.activePaginationItem - 1);
      this.removeEtcElement();
      this.renderEtcElement();
    }

    const newAtivePaginationItem = this.activePaginationItem - 1;
    this.highlightActivePaginationItem(newAtivePaginationItem);
    if (this.pageNumber <= 1) {
      return;
    }
    this.pageNumber--;
    this.router.navigate(['/shop'], {
      queryParams: { pageNumber: this.pageNumber },
    });
    window.scrollTo(0, 0);
    this.requireLoading();
  }

  handleGotoNextPage(): void {
    console.log('handleGotoNextPage');
    let activePageNumber: number = 1;
    if (typeof this.activePaginationItem === 'string') {
      const paginationItem = parseInt(this.activePaginationItem);
      activePageNumber = paginationItem + 1;
      this.highlightActivePaginationItem(activePageNumber);
    }
    this.handleRenderNextPagination(activePageNumber);

    // Last page
    if (this.totalPages === this.pageNumber) return;
    this.pageNumber++;
    this.router.navigate(['/shop'], {
      queryParams: { pageNumber: this.pageNumber },
    });
    window.scrollTo(0, 0);
    this.requireLoading();
  }

  removePaginationItemActive(): void {
    this.paginationItems.forEach(
      (item: PaginationItemProps) => (item.isActive = false)
    );
  }

  isExistPageNumber(activePageNumber: number): boolean {
    const item = this.paginationItems.find(
      (paginationItem: PaginationItemProps) =>
        paginationItem.content === activePageNumber + 1
    );
    if (item) return true;
    return false;
  }

  removeEtcElement(): void {
    const etcElementOne = document.querySelector('.etc-1');
    if (etcElementOne) {
      etcElementOne.remove();
    }
  }

  highlightActivePaginationItem(activePageNumber: number): void {
    for (let i = 0; i < this.paginationItems.length; i++) {
      if (this.paginationItems[i].content === activePageNumber) {
        console.log('this.paginationItems[i].content === activePageNumber');
        this.removePaginationItemActive();
        this.paginationItems[i].isActive = true;
        break;
      }
    }
  }

  renderEtcElement(): void {
    const pageOne = document.querySelector('.pagination-1');
    const template = `
        <li class="etc etc-1">
          <button
          style="width: 34px; background-color: transparent; border: none; pointer: none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              viewBox="0 0 10 2"
              focusable="false"
              aria-hidden="true"
            >
              <path
                d="M9 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1zM5 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1zM1 2c-.608 0-1-.425-1-1s.392-1 1-1 1 .448 1 1c0 .575-.392 1-1 1z"
              ></path>
            </svg>
          </button>
        </li>
      `;
    pageOne?.insertAdjacentHTML('afterend', template);
  }

  handleClickNavigationItem(event?: Event): void {
    // @ts-ignore
    const activePageNumber = parseInt(event.target.innerText);
    this.highlightActivePaginationItem(activePageNumber);

    // Handle when user click pagination number one
    this.handleClickPaginationOne(activePageNumber);

    this.handleRenderNextPagination(activePageNumber);

    this.pageNumber = activePageNumber;
    this.router.navigate(['/shop'], {
      queryParams: { pageNumber: this.pageNumber },
    });
    this.requireLoading();
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    // Auto trigger and pass the new vluae to my app
    this.route.queryParams.subscribe((params) => {
      const pageNumber: number = params['pageNumber'];
      this.activePaginationItem = pageNumber;
    });

    // Update the active pagination when re-rendered
    let activePageNumber: number = 1;
    if (typeof this.activePaginationItem === 'string') {
      console.log('typeof this.activePaginationItem === string');
      activePageNumber = parseInt(this.activePaginationItem);

      // if (activePageNumber === 4) {
      //   console.log('here');
      //   this.renderPaginationLayoutOne();
      // } else if (activePageNumber >= 5) {
      //   const paginationItem: PaginationItemProps | undefined =
      //     this.paginationItems.find(
      //       (paginationItem: PaginationItemProps) =>
      //         paginationItem.content === 1
      //     );

      //   // Reset array
      //   if (paginationItem) {
      //     this.paginationItems = [paginationItem];
      //   }

      //   this.renderPaginationLayoutTwo(this.activePaginationItem - 1);
      //   this.removeEtcElement();
      //   this.renderEtcElement();
      // }
    }

    this.highlightActivePaginationItem(activePageNumber);
  }
}
