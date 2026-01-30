import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Todo } from "./components/todo/todo";
import { Todos } from './types/todo';
import { TodoForm } from "./components/todo-form/todo-form";
import { FilterActivePipe } from "./pipes/filter-active-pipe";
import { TodosService } from './services/todos';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    Todo,
    TodoForm,
    FilterActivePipe,
  ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  todos: Todos[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(
    private todosService: TodosService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.todosService.todos$
      .subscribe((todos) => {
        this.todos = todos;
        this.cdr.detectChanges();
      });
  }

  get filteredTodos(): Todos[] {
    if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }


  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe(newTodo => {
      this.todos = [
        ...this.todos,
        newTodo
      ];
    });
  }

  toggleTodo(todo: Todos) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed })
      .subscribe();
  }

  renameTodo(todo: Todos, title: string) {
    this.todosService.updateTodo({ ...todo, title })
      .subscribe();
  }

  deleteTodo(todo: Todos) {
    this.todosService.deleteTodo(todo).subscribe();
  }
}
