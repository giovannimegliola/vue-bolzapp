import {contactList} from './data.js'


const {createApp} = Vue;

 
createApp({
  data (){
    return {
      contacts: contactList,
      activeContactIndex: 0,
      searchText: '',
      message: '',
    }
  },
  methods:{
    selectContact(id){
      this.activeContactIndex = this.contacts.findIndex((contact)=> contact.id === id);

    }
  },
  computed:{

  }

}


).mount('#app');
