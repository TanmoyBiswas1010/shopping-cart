import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[filtercolor]'
})
export class ColorDirective implements OnInit{
    @Input() filtercolor:string;
  constructor(private renderer:Renderer2,private element:ElementRef) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement,'backgroundColor',this.filtercolor);
}
}

