const dt = luxon.DateTime;


import {contactList} from './data.js'


const {createApp} = Vue;

 
createApp({
  data (){
    return {
      contacts: contactList,
      activeContactIndex: 0,
      searchText: '',
      message: '',
      answer: 'ok'
    }
  },
  methods:{
    selectContact(id){
      const index = this.contacts.findIndex ((contact)=> contact.id === id);
      if (index !== -1){
        this.activeContactIndex = index;
      }
    },
    getLastMessage(id){
      const contact = this.contacts.find((contact)=> contact.id === id);
      const len = contact.messages.length;
      if (len > 0){
        return contact.messages[len - 1].message;
      } else {
        return 'non ci sono messaggi';
      }    
    },
    getLastAccess(id){
      const contact = this.contacts.find((contact)=> contact.id === id);
      const len = contact.messages.length;
      if (len > 0){
        return contact.messages[len - 1].date;
      } else {
        return 'sconosciuto';
      }
    },
    newMessage(){
      const newmsg = {
        date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
        message: this.message,
        status: 'sent'
      }
      this.activeContact.messages.push(newmsg);
      this.message = '';
      setTimeout(()=>{
        const newmsg = {
          date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
          message: this.answer,
          status: 'received'
        }
        this.activeContact.messages.push(newmsg);


      }, 1000)
    }
  },
  computed:{
    activeContact(){
      return this.contacts[this.activeContactIndex];
    },
    lastDate(){
      const len = this.activeContact.messages.length;
      if (len > 0){
        return this.activeContact.messages[len - 1].date;
      } else {
        return 'sconosciuto';
      }  
    },
    filteredContacts() {
      return this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}).mount('#app');
