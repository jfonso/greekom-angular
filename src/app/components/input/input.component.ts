import {Component, forwardRef, input, Input, model, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  label = input('');
  name = input('');
  placeholder = input('');
  type = input('');
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
