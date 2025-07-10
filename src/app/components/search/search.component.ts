import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.query.trim());
  }
}
