import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numberOnly]'
})
export class NumbersOnlyDirective {

  @Input() allowDecimals: boolean = false;
  constructor(private elementRef: ElementRef) { }

  @HostListener('keyup', ['$event']) onKeUp(e: KeyboardEvent): void{
    const initValue = this.elementRef.nativeElement.value;
    //If your key is a point add zero before point
    if (e.key === '.' && initValue.charAt(0) === '.'){
      this.elementRef.nativeElement.value = 0 + e.key
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {

    const allowKeyWithOutPeriod = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Escape'];
    const allowKeyWithPeriod = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Escape', '.'];
    // Allow decimals
    if (this.allowDecimals) {
      if (this.elementRef.nativeElement.value.indexOf('.') > -1) {
        this.keyValidate(allowKeyWithOutPeriod, e);
      }else{
        this.keyValidate(allowKeyWithPeriod, e);
      }
    } else {
      this.keyValidate(allowKeyWithOutPeriod, e);
    }
  }

  keyValidate(allowKeys: string[], e: KeyboardEvent) {
    if (allowKeys.indexOf(e.key) !== -1 ||
    // Allow: Ctrl+A or Allow: Ctrl+C
    (e.key === 'a' && e.ctrlKey) || (e.key === 'c' && e.ctrlKey) ||
    // Allow: Ctrl+V or Allow: Ctrl+X
    (e.key === 'v' && e.ctrlKey) || (e.key === 'x' && e.ctrlKey)){
      return;
    }
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
  }

}
