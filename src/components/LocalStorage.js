class LocalStorage {
    static clearAllUserCache = () => {
      LocalStorage.removeID();
      LocalStorage.removeComments();
      LocalStorage.removeRatings();
    };

    static saveID = (id) => LocalStorage.put("savedID", id);
    static getID = () => LocalStorage.get("savedID") === null ? '' : LocalStorage.get("savedID");
    static removeID = () => LocalStorage.remove("savedID");

    static saveAPI = (api) => LocalStorage.put("savedAPI", api);
    static getAPI = () => LocalStorage.get("savedAPI") === null ? '' : LocalStorage.get("savedAPI");
    static removeAPI = () => LocalStorage.remove("savedAPI");

    static saveComments = (comments) => LocalStorage.put("savedComments", comments);
    static getComments = () => LocalStorage.get("savedComments") === null ? '' : LocalStorage.get("savedComments");
    static removeComments = () => LocalStorage.remove("savedComments");

    static saveRatings = (ratings) => LocalStorage.put("savedRatings", ratings);
    static getRatings = () => LocalStorage.get("savedRatings") === null ? 1 : parseInt(LocalStorage.get("savedRatings"), 10);
    static removeRatings = () => LocalStorage.remove("savedRatings");

    static put = (key, value) => {
        return window.localStorage.setItem(key, value);
    };
    static get = (key) => {
        return window.localStorage.getItem(key);
    };
    static remove = (key) => {
        return window.localStorage.removeItem(key);
    };

    static storageAvailable() {
        try {
            this.storage = window['localStorage'];
            let x = '__storage_test__';
            this.storage.setItem(x, x);
            this.storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                    // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (this.storage && this.storage.length !== 0);
        }
    }
}

export default LocalStorage;