import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

// export const getAllMovies = async () => {
//   const data = await fs.readFile(moviesPath);
//   return JSON.parse(data);
// }

// export const getMovieById = async (id) => {
//   const movies = await getAllMovies();
//   const result = movies.find(item => item.id === id);
//   return result || null;
// }

// export const addMovie = async (data) => {
//   const movies = await getAllMovies();
//   const newMovie = {
//       id: nanoid(),
//       ...data,
//   };
//   movies.push(newMovie);
//   await updateMovies(movies);
//   return newMovie;
// }

// export const updateMovieById = async (id, data) => {
//   const movies = await getAllMovies();
//   const index = movies.findIndex(item => item.id === id);
//   if (index === -1) {
//       return null;
//   }
//   movies[index] = { ...movies[index], ...data };
//   await updateMovies(movies);
//   return movies[index];
// }

// export const deleteById = async (id) => {
//   const movies = await getAllMovies();
//   const index = movies.findIndex(item => item.id === id);
//   if (index === -1) {
//       return null;
//   }
//   const [result] = movies.splice(index, 1);
//   await updateMovies(movies);
//   return result;
// }
