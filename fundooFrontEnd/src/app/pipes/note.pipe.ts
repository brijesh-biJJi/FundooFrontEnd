import { Pipe, PipeTransform } from '@angular/core';
import{NoteModel} from '../model/note-model.model';

@Pipe({
  name: 'note'
})
export class NotePipe implements PipeTransform {

  transform(noteModel: NoteModel[], searchNote:string): NoteModel[] {
    if(!noteModel || !searchNote){
      console.log('Non search', noteModel);
      return noteModel;
    }

    console.log('search ', noteModel,'term ',searchNote);
    return noteModel.filter(note=>note.title.toLowerCase().indexOf(searchNote.toLowerCase())!=-1);
  }

}
