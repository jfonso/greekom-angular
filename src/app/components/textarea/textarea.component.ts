import { Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  imports: [FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TextareaComponent)
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  label = input('');
  name = input('');
  placeholder = input('');
  rows = input('1');
  value = '';
  disabled = model(false);
  private touched = false;
  private _onChance = (_: string) => {};
  private _onTouched = () => {};
  writeValue(obj: string): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this._onChance = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  private markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this._onTouched();
    }
  }
  valueChange() {
    this._onChance(this.value);
    this.markAsTouched();
  }
}
