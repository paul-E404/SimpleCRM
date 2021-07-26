import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) { }

  ngOnInit() {

  }

  //source: https://zoaibkhan.com/blog/create-a-responsive-sidebar-menu-with-angular-material/

  /**
   * Listens to screenwidth for managing responsive sidenavbar overlapping over content container.
   */
  ngAfterViewInit() {

    setTimeout(() => {
      this.observer.observe(['(max-width: 1000px)']).subscribe((result) => {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 0);

  }

  /**
   * Closes sidenavbar.
   */
  closeSidenav() {
    this.sidenav.close();
  }
}
