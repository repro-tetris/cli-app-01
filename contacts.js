const fs = require("fs");
const path = require("path");

// зберігаємо абсолютний шлях до файлу з контактами
const contactsPath = path.resolve("./db/contacts.json");

let db = JSON.parse(fs.readFileSync(contactsPath, { encoding: "utf8" }));

// для генерації Id. Беремо найбільший і запам'ятовуємо.
let nextId = Math.max(...db.map((contact) => contact.id));

// зберегти зміни у файлі
const saveContacts = () => {
  fs.writeFileSync(contactsPath, JSON.stringify(db));
};

module.exports = {
  // Повертає масив контактів
  listContacts() {
    return db;
  },
  //отримати контакт по Id. Якщо такого нема, вертає -> undefined
  getContactById(contactId) {
    return db.find((contact) => contact.id === contactId);
  },

  //видаляє контакт по Id. Вертає видалений контакт або undefined, якщо контакта з таким Id нема
  removeContact(contactId) {
    const contact = this.getContactById(contactId);

    if (contact) {
      db = db.filter((contact) => contact.id !== contactId);
      saveContacts();
    }

    return contact;
  },

  // додати контакт. Вертає новий контакт
  addContact(name, email, phone) {
    const contact = { id: ++nextId, name, email, phone };
    db.push(contact);
    saveContacts();
    return contact;
  },
};
