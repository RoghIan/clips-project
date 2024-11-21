import { Component, inject, input, AfterViewInit, viewChild, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterViewInit, OnDestroy{
  modal = inject(ModalService);
  id = input.required<string>();
  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('baseDialog');

  constructor() {
    console.log(this.modal);
    
  }

  ngOnDestroy(): void {
    this.modal.unregister(this.id());
  }

  ngAfterViewInit(): void {
    this.modal.register(this.id(), this.dialog().nativeElement);
  }
}
