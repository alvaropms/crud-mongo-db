import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiPath: string = environment.url+'person'

  constructor(private sharedService: SharedService) { }

  getAllPersons(): Observable<Person[]>{
    return this.sharedService.get(this.apiPath)
  }

  deletePerson(id: string): Observable<any>{
    return this.sharedService.delete(this.apiPath+'/'+id)
  }

  createPerson(person: Person): Observable<Person>{
    return this.sharedService.post(person, this.apiPath)
  }

  updatePerson(person: Person): Observable<Person>{
    return this.sharedService.put(person, this.apiPath+'/'+person._id)
  }
}
