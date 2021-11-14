const contacts = require("./contacts");
const argv = require("yargs")(process.argv.slice(2))
  .usage("Usage: $0 --action [action]")
  .command("--get", "Get contact by Id")
  .example("$0 --action list", "Show contacts")
  .example("$0 --action get --id 5", "Show contact by Id=5")
  .example(
    "$0 --action add --name Mango --email mango@gmail.com --phone 322-22-22",
    "Add new contact"
  )
  .example("$0 --action remove --id=3", "Remove contact with Id=3")
  .demandOption(["action"]).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(contacts.listContacts());
      break;

    case "get":
      console.log(contacts.getContactById(id));
      break;

    case "add":
      console.log(contacts.addContact(name, email, phone));
      break;

    case "remove":
      console.log(contacts.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
