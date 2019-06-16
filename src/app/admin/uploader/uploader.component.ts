import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter
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
  @Input() title!: string;
  @Input() storageFolder!: string;
  @Input() multiple: boolean;
  @Input() fileType: string;
  @Input() maxSizeKb: number;

  @Output() done = new EventEmitter<{
    url: string;
    path: string;
    name: string;
    type: string;
  }>();
  @Output() delete = new EventEmitter();

  isHovering: boolean;

  files: File[] = [];
  file: File;

  constructor(private ref: ChangeDetectorRef) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    console.log(files);

    if (!files) {
      return;
    }

    if (!this.multiple) {
      const newFile = files[0];
      console.log(newFile.size / 1024, this.maxSizeKb);

      if (this.maxSizeKb && newFile.size / 1024 > this.maxSizeKb) {
        console.error('File is too big! :(');
        return;
      }

      if (this.fileType && newFile.type.split('/')[0] !== this.fileType) {
        console.log('Unsupported file type :( ', newFile.type);
        return;
      }
      this.file = null;
      this.ref.detectChanges();
      this.file = newFile;
    } else {
      for (let i = 0; i < files.length; i++) {
        const item = files.item(i);
        if (item.size === 0) {
          console.log(`File '${item.name}' has no size`);
          continue;
        }

        if (this.maxSizeKb && item.size / 1024 > this.maxSizeKb) {
          console.error('File is too big! :(');
          return;
        }

        console.log(item.size / 1024, this.maxSizeKb);

        if (this.fileType && item.type.split('/')[0] !== this.fileType) {
          console.log('unsupported file type :( ', item.type);
          return;
        }
        this.files.push(item);
      }
    }
    this.ref.detectChanges();
  }

  onUploadDone($event) {
    this.done.emit({ type: this.fileType, ...$event });
  }

  onDeleteFile() {
    this.file = null;
    this.ref.detectChanges();
    this.delete.emit();
  }

  deleteItem(index: number) {
    this.files.splice(index, 1);
  }
}
