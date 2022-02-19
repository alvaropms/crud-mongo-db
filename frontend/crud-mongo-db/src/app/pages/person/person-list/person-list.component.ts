import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: Person[] = []
  personForm: FormGroup = new FormGroup({})
  editPerson: Person = {}

  constructor(
    private personService: PersonService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildPersonForm()

    this.personService.getAllPersons().subscribe(
      resp => this.persons = resp
    )
  }

  deletePerson(person: Person){
    this.personService.deletePerson(person._id || '').subscribe(
      {
        next: () => {
          alert('Deletado com sucesso!')
          this.persons = this.persons.filter( (element: Person) => element._id !== person._id )
        },
        error: () => alert('Erro ao deletar pessoa')
      }
    )
  }

  createPerson(person: Person){
    this.personService.createPerson(person).subscribe(
      {
        next: (resp) => {
          alert('Criado com sucesso!')
          this.persons.push( resp as Person )
        },
        error: () => alert('Erro ao criar pessoa!')
      }
    )
    this.personForm.reset()
  }

  updatePerson(person: Person){
    person = new Person(person.name, person.phone, this.editPerson._id)
    this.personService.updatePerson(person).subscribe(
      {
        next: (resp) => {
          alert('Atualizado com sucesso!')
          this.persons = this.persons.map( (element: Person) => 
            element._id === resp._id ? resp as Person : element as Person
          )
        },
        error: () => alert('Erro ao atualizar!')
      }
    )
    this.personForm.reset()
  }

  setPersonEdit(person: Person){
    this.editPerson = person
    this.personForm.setValue({name: person.name, phone: person.phone})
  }

  private buildPersonForm(){
    this.personForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('[0-9]*')]]
    })
  }

}
