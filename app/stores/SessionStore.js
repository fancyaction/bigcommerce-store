import { observable, action, computed } from 'mobx';




class SessionStore {
    @observable authUser = {}; 
    @observable listItems = {}; 
    @observable tab = 0;
    @action
    setListItems = items => {
        this.listItems = items;
    }
}


export default SessionStore;