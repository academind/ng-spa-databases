import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Todo {
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];

  onAddTodo(form: NgForm) {
    this.todos.push({ title: form.value.todo });
    form.resetForm();
  }

  onRemoveTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
