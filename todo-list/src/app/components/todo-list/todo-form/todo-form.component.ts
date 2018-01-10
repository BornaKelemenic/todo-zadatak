import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit 
{
  form: FormGroup;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  )
  {
    this.createForm();
  }

  ngOnInit()
  {}

  createForm()
  {
    this.form = this.formBuilder.group({
        ime: ['', Validators.required]
      }
    );
  }

  onSubmit()
  {
    const newTodo: Todo = {
      ime: this.form.controls['ime'].value
    };

    this.todoService.saveTodo(newTodo);

    this.form.reset();
  }

}
