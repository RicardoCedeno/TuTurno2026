import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServices<T> {
  selectedItem = signal<T | null>(null);

  clearSelectedItem(){
    this.selectedItem.set(null);
  }
  setSelectedItem(item: T){
    this.selectedItem.set(item);
  }
  getSelectedItem(){
    return this.selectedItem();
  }
}
