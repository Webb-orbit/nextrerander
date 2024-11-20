"use client"
// TO/TF
import { PickAllOffDocs, PickCreateOffDoc, PickOneOffDoc, PickToChangeOffDoc, PickToDeleteOffDoc } from "../lib/offline";

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('subhro', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('docs')) {
        db.createObjectStore('docs', { keyPath: '_id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
      console.log(event.target.result);
    };

    request.onerror = (event) => {
      reject(`Error initializing database: ${event.target.error}`);
    };
  });
};

export const addData = (data) => {
  return new Promise(async (resolve, reject) => {
    const db = await initDB();
    const transaction = db.transaction('docs', 'readwrite');
    const store = transaction.objectStore('docs');

    if (!navigator.onLine) {
      const request = store.add(data);
      request.onsuccess = () => resolve(data);
      request.onerror = (event) =>
        reject(`Error adding data: ${event.target.error}`);
    } else {
      const request = store.add(data);
      request.onsuccess = async () => {
        const addonline = await PickCreateOffDoc({ ...data })
        console.log("addoffline on online=>", addonline);
        resolve(data);
      }
      request.onerror = (event) =>
        reject(`Error adding data: ${event.target.error}`);
    }
  });
};

export const getData = (id) => {
  return new Promise(async (resolve, reject) => {
    const db = await initDB();
    const transaction = db.transaction('docs', 'readonly');
    const store = transaction.objectStore('docs');

    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = async (event) => {
      if (navigator.onLine) {
        const data = await PickOneOffDoc(id)
        console.log("try to get on online", data);
        resolve(data.data)
      } else {
        reject(`Error fetching data: ${event.target.error}`);
      }
    }
  });
};

export const getAllData = () => {
  return new Promise(async (resolve, reject) => {
    const db = await initDB();
    const transaction = db.transaction('docs', 'readonly');
    const store = transaction.objectStore('docs');

    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = async (event) => {
      if (navigator.onLine) {
        const data = await PickAllOffDocs()
        console.log("try to get ALLS on online", data);
        resolve(data.data)
      } else {
        reject(`Error fetching ALL data: ${event.target.error}`);
      }
    }
  });
};

export const updateData = (id, updatedProperties) => {
  return new Promise(async (resolve, reject) => {
    const db = await initDB();
    const transaction = db.transaction('docs', 'readwrite');
    const store = transaction.objectStore('docs');

    const getRequest = store.get(id);
    getRequest.onsuccess = () => {
      const existingData = getRequest.result;

      if (existingData) {
        console.log(existingData, existingData.value);
        const updatedData = { ...existingData, ...updatedProperties };

        const putRequest = store.put(updatedData);

        putRequest.onsuccess = async () => {
          if (navigator.onLine) await PickToChangeOffDoc(id, { ...updatedProperties })
          resolve(updatedData);
        }
        putRequest.onerror = (event) => {
          reject(`Error updating data: ${event.target.error}`);
        }
      } else {
        reject(`Data with ID ${id} not found.`);
      }
    };

    getRequest.onerror = (event) =>
      reject(`Error fetching data: ${event.target.error}`);
  });
};


export const deleteData = (id) => {
  return new Promise(async (resolve, reject) => {
    const db = await initDB();
    const transaction = db.transaction('docs', 'readwrite');
    const store = transaction.objectStore('docs');

    const request = store.delete(id);
    request.onsuccess = async () => {
      if (navigator.onLine) await PickToDeleteOffDoc(id)
      resolve(`Data with id ${id} deleted.`);
    }
    request.onerror = (event) =>
      reject(`Error deleting data: ${event.target.error}`);
  });
};