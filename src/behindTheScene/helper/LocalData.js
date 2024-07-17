export default class LocalData {
  static storeData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static checkStorageExists(key) {
    const checkStorage = localStorage.getItem(key);
    if (checkStorage) return true;
    else return false;
  }

  static getStorageData(key) {
    let data = null;
    this.checkStorageExists(key)
      ? (data = JSON.parse(localStorage.getItem(key)))
      : (data = null);
    return data;
  }

  static deleteStorage(key) {
    localStorage.removeItem(key);
  }
}
