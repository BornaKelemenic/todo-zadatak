import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Todo } from '../../../models/todo.model';
import { TodoService } from '../../../services/todo.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-detalji',
  templateUrl: './todo-detalji.component.html',
  styleUrls: ['./todo-detalji.component.css']
})
export class TodoDetaljiComponent implements OnInit
{
  todo: Todo;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location,
    private fb: FormBuilder
  )
  {}

  ngOnInit()
  {
    this.route.params.subscribe((params: Params) =>
    {
      this.todo = this.todoService.getTodoById(+params['id']);
    });

    this.createForm();
  }

  createForm()
  {
    this.form = this.fb.group({
      detalji: [this.todo.detalji || '', Validators.required]
    });
  }

  editTodo()
  {
    this.todo.detalji = this.form.controls['detalji'].value;
    this.todoService.editTodo(this.todo);
    this.goBack();
  }

  goBack()
  {
    this.location.back();
  }

  deleteTodo()
  {
    if (confirm('Jeste li sigurni da želite obristi ovaj zadatak ?'))
    {
      this.todoService.deleteTodoById(this.todo.id);
      this.goBack();
    }
  }

}
