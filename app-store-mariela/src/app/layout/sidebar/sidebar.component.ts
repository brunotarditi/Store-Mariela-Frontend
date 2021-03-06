import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NAV_ITEM_DATA } from '@data/utils/nav-item-data';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  shouldRun: boolean;
  navItems: any[];
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.shouldRun = true;
    this.navItems = NAV_ITEM_DATA;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
