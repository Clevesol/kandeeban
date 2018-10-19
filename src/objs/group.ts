import { Contact } from "@ionic-native/contacts";
import { CustomContact } from "./contacts";

export class Group{

    public id;
    public name:string;
    public contacts:Array<CustomContact>;

public constructor(){

    this.contacts = [];

}

addContact(contact:CustomContact){
    this.contacts.push(contact);
}

removeContact(contact:CustomContact){
    let index = this.contacts.indexOf(contact);
    this.contacts.splice(index,1);
}

inContacts(contact:CustomContact){
    return this.contacts.indexOf(contact) > -1;
}


public toString(){
    return this.id + " "+ this.name;
}

}