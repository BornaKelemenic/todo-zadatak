import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoService 
{
  todos: Array<Todo> = new Array;

  constructor()
  {
    this.getFromLocalStorage();
    /*this.todos.push(
      { id: 1, ime: 'Zadatak 1' },
      { id: 2, ime: 'Zadatak 2', detalji: 'Detalji zadatka 2' },
      { id: 3, ime: 'Zadatak 3' },
      { id: 4, ime: 'Zadatak 4', detalji: 'Detalji zadatka 4' }
    );*/
  }

  /**
   * Dohvati sve todove
   */
  getTodos(): Array<Todo>
  {
    this.getFromLocalStorage();
    return this.todos;
  }

  /**
   * Spremi novi todo
   * @param todo
   */
  saveTodo(todo: Todo)
  {
    let id;
    if (this.todos.length !== 0)
    {
      id = this.todos[this.todos.length - 1].id + 1;
    }
    else
    {
      id = 1;
    }

    const newTodo = {
      id:  id,
      ime: todo.ime,
      detalji: todo.detalji
    };

    this.todos.push(newTodo);

    this.saveToLocalStorage();
  }

  /**
   * Uredi postojeći todo
   * @param todo
   */
  editTodo(todo: Todo)
  {
    const index = this.todos.findIndex(oldTodo => oldTodo.id === todo.id);
    this.todos[index] = todo;

    this.saveToLocalStorage();
  }

  /**
   * Dohvati todo preko id-a
   * @param id 
   */
  getTodoById(id: number): Todo
  {
    const todo: Todo[] = this.todos.filter((e) => {
      return e.id === id;
    });

    return todo[0];
  }

  /**
   * Obriši todo preko id-a
   * @param id
   */
  deleteTodoById(id: number)
  {
    this.todos = this.todos.filter(e => e.id !== id);

    this.saveToLocalStorage();
  }

  /**
   * Obriši todove preko arraya id-a
   * @param ids 
   */
  deleteTodosByArrayOfIds(ids: number[])
  {
    ids.forEach(id => {
      const i = this.todos.findIndex(todo => todo.id === id);
      this.todos.splice(i, 1);
    });

    this.saveToLocalStorage();
  }

  private saveToLocalStorage()
  {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private getFromLocalStorage()
  {
    this.todos = JSON.parse(localStorage.getItem('todos'));
    if (!this.todos)
    {
      this.todos = [];
    }
  }

}
