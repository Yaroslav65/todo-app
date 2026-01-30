import { Injectable } from '@angular/core';
import { Todos } from '../types/todo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

const API_URL = 'https://697b80800e6ff62c3c5c4574.mockapi.io/api/v1/todos'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  refresh$$ = new BehaviorSubject(null);
  todos$: Observable<Todos[]>;

  constructor(
    private http: HttpClient
  ) {
    this.todos$ = this.refresh$$.pipe(
      switchMap(() => this.getTodos()),
    )
  }

  getTodos() {
    return this.http.get<Todos[]>(`${API_URL}`);
  }

  createTodo(title: string) {
    return this.http.post<Todos>(`${API_URL}`, {
      id: Date.now(),
      title,
      completed: false,
    }).pipe(
      tap(() => this.refresh$$.next(null))
    )
  }

  updateTodo(todo: Todos) {
    return this.http.put<Todos>(`${API_URL}/${todo.id}`, todo).pipe(
      tap(() => this.refresh$$.next(null))
    )
  }

  deleteTodo(todo: Todos) {
    return this.http.delete<Todos>(`${API_URL}/${todo.id}`).pipe(
      tap(() => this.refresh$$.next(null))
    )
  }
}
