import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Foreground, Slide } from "src/app/interfaces/";
import { ForegroundsService, SlidesService } from "src/app/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  slides$: Observable<Slide[]>;
  foregrounds$: Observable<Foreground[]>;

  constructor(
    private slides: SlidesService,
    private foregrounds: ForegroundsService
  ) {}

  ngOnInit() {
    this.slides$ = this.slides.getAllVisible();
    this.foregrounds$ = this.foregrounds.getAllVisible();
  }
}
