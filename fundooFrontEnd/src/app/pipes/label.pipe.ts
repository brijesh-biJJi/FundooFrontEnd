import { Pipe, PipeTransform } from '@angular/core';
import {Label} from '../model/label.model'
@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {
  labels:Label[];
  transform(labelArray:Label[], searchLabel:string): Label[] 
  {
    if(!labelArray || !searchLabel){
      console.log('Label search', labelArray);
      return labelArray;
    }

    console.log('search ', labelArray,'term ',searchLabel);
    return labelArray.filter(label=>label.labelName.toLowerCase().indexOf(searchLabel.toLowerCase())!=-1);
    // if(noteId==null){
    //   return this.labels;
    // }
    // return labelArray.filter(label=>label.noteId===noteId);



  }

}
