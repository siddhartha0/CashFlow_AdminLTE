class LocalData {
  static storeData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getStorageData(key) {
    if (this.checkStorageExists(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return null;
    }
  }

  static checkStorageExists(key) {
    const checkStorage = localStorage.getItem(key);
    if (checkStorage) return true;
    else return false;
  }

  static deleteStorage(key) {
    localStorage.removeItem(key);
  }
}

export default new LocalData();
