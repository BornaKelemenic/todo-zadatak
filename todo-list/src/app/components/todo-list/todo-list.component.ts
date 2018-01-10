import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit 
{
  todos: Array<Todo> = new Array;
  selectedTodos: number[] = [];

  constructor(
    private todoService: TodoService
  )
  {}

  ngOnInit()
  {
    this.todos = this.todoService.getTodos();
  }

  toggleSelect(id: number)
  {
    if (this.selectedTodos.includes(id))
    {
      this.selectedTodos = this.selectedTodos.filter(e => e !== id);
    }
    else
    {
      this.selectedTodos.push(id);
    }
  }

  deleteSelectedTodos()
  {
    this.todoService.deleteTodosByArrayOfIds(this.selectedTodos);
    this.selectedTodos = [];
  }
}
