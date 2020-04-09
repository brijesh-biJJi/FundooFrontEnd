import { Pipe, PipeTransform } from '@angular/core';
import {Label} from '../model/label.model'
@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {
  labels:Label[];
  transform(labelArray:Label[], noteId:any): Label[] {
    
    if(noteId==null){
      return this.labels;
    }
    return labelArray.filter(label=>label.noteId===noteId);

  }

}
