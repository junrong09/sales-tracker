class LocalStorage {

    static saveID = (id) => LocalStorage.put("savedID", id);
    static getID = () => LocalStorage.get("savedID") === null ? '' : LocalStorage.get("savedID");
    static removeID = () => LocalStorage.remove("savedID");

    static saveTarget = (id, date, target) => LocalStorage.put("id-" + id + "_date-" + date.toLocaleDateString() + "_target", target);
    static getTarget = (id, date) => {
        let v = LocalStorage.get("id-" + id + "_date-" + date.toLocaleDateString() + "_target");
        return v === null ? 0 : v;
    };

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