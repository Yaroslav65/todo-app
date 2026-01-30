import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todos } from '../../types/todo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo.html',
})
export class Todo {
  @Output() delete = new EventEmitter();
  @Output() rename = new EventEmitter<string>();
  @Output() toggle = new EventEmitter();

  @ViewChild('titleField') 
  set titleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  };

  @Input() todo!: Todos;

  editing = false;
  title = '';

  edit() {
    this.editing = true;
    this.title = this.todo.title;
  }

  save() {
    if (!this.editing) {
      return;
    }

    this.editing = false;
    this.rename.emit(this.title);
  }
}
