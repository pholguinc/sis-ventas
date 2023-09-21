import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  ActivationEnd,
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
} from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [],
})
export class ToolbarComponent {
  public title!: string;
  public subtitle!: string;
  public url!: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => ({
          data: event.snapshot.data,
        }))
      )
      .subscribe(({ data }) => {
        this.title = data['title'];
        this.subtitle = data['subtitle'];
        this.url = this.router.url;
      });
  }
}
