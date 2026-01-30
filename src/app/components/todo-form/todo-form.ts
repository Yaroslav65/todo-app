import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-form.html',
})
export class TodoForm {
  @Output() save = new EventEmitter<string>();

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
    }),
  });

  handleFormSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    this.save.emit(this.title.value.trim());
    this.title.reset();
  }
}
