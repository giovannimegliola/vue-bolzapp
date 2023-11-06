const dt = luxon.DateTime;

const answers = [
  "Provo a chiamare e ti aggiorno",
  "Va bene!",
  "Se il buongiorno si vede dal mattino...",
  "Mi sembra un'ottima idea",
  "Mi dispiace, non so come aiutarti",
  "Giusto, non ci avevo pensato!",
  "Non preoccuparti, ci penso io",
  "Ti tengo aggiornato",
  "Mandami il suo contatto telefonico",
  "Sempre un piacere!",
  "Che ne dici se ordiniamo una pizza?",
  "Non posso, sarà per la prossima volta"
];

import {contactList} from './data.js'

const {createApp} = Vue;

createApp({
  data (){
    return {
      contacts: contactList,
      activeContactIndex: 0,
      searchText: '',
      message: '',
      showChat: false
    }
  },

  methods:{
    selectContact(id){
      const index = this.contacts.findIndex ((contact)=> contact.id === id);
      if (index !== -1){
        this.activeContactIndex = index;
      }
      this.showChat = true;
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
      if (this.message.trim() === '') {
      return;
      }
      const randomIndex = Math.floor(Math.random() * answers.length);
      const randomAnswer = answers[randomIndex];
      const newmsg = {
        date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
        message: this.message,
        status: 'sent'
      }
      this.activeContact.messages.push(newmsg);
      
      this.message = '';
      setTimeout(()=>{
        const answerMessage = {
          date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
          message: randomAnswer,
          status: 'received'
        }
        this.activeContact.messages.push(answerMessage);
      }, 1000);
      this.$nextTick(() =>{
        this.$refs.messages [this.$refs.messages.length -1].scrollIntoView({behavior:'smooth'});

      });
      
    },
    toggleDeleteMenu(contact, msg) {
      msg.showDeleteMenu = !msg.showDeleteMenu;
    },
    deleteMessage(contact, msgIndex) {
      contact.messages.splice(msgIndex, 1);
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
  },

}).mount('#app');
