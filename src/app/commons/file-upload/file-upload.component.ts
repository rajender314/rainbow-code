import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'adj-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor, OnInit {

  onChange: Function;
  public file: File | null = null;

  @Input('accept')
  public accept: string;

  public allowedType: string;

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  ngOnInit(): void {
    if (this.accept) {
      this.allowedType = "." + this.accept;
    }
  }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

  @HostListener('change', ['$event.target.files'])
  public emitFiles(event: FileList) {
    const file = event && event.item(0);
    if (this.onChange) {
      this.onChange(file);
    }
    this.file = file;
  }

}
