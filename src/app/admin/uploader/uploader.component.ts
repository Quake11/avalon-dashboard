import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-25px)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),

    trigger('list', [
      transition('* => *', [
        query(
          ':leave',
          [
            stagger(100, [
              animate(
                '0.5s',
                style({ transform: 'translateY(-25px)', opacity: 0 })
              )
            ])
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-25px)' }),
            stagger(100, [
              animate('0.2s', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class UploaderComponent {
  isHovering: boolean;

  files: File[] = [];

  constructor(private ref: ChangeDetectorRef) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onUpload(files: FileList) {
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      const item = files.item(i);
      if (item.size === 0) {
        console.log(`File '${item.name}' has no size`);

        continue;
      }

      this.files.push(item);
      this.ref.detectChanges();
    }
  }

  deleteItem(index: number) {
    this.files.splice(index, 1);
  }
}
