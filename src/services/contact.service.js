'use strict'

import { contactServiceData } from '../data/contactService.js'
import { dbService } from './db.service.js'

const CONTACT_KEY = 'contacts'

export const contactService = {
    query,
    getById,
    remove,
    save,
    getEmptyContact,
    getNextContactId
}

async function query() {
    var contacts = await dbService.query(CONTACT_KEY)
    if (!contacts || !contacts.length) {
        contacts = _createDefaultContacts()
        await dbService.insert(CONTACT_KEY, contacts)
    }
    return contacts
}

async function getById(id) {
    return await dbService.get(CONTACT_KEY, id)
}

async function remove(id) {
    return await dbService.remove(CONTACT_KEY, id)
}

async function save(contact) {
    if (contact._id) return await dbService.put(CONTACT_KEY, contact)
    else return await dbService.post(CONTACT_KEY, contact)
}

function getEmptyContact() {
    return {
        name: '',
        phone: 0,
    }
}

async function getNextContactId(id) {
    const contacts = await query()
    const currContact = contacts.filter(contact => contact._id === id)
    const nextIdx = (contacts.indexOf(currContact) + 1) > contacts.length ? 0 : (contacts.indexOf(currContact) + 1)
    const nextId = contacts[nextIdx+1]._id
    console.log(nextIdx)
    return {
        nextId
    }
}

function _createDefaultContacts() {
    let contacts = contactServiceData.getContactsData()
    console.log(contacts)
    return contacts.map(contact => _createContact(
        contact.name, contact.phone, contact.email
    ))
}

function _createContact(name, phone, email,) {
    return {
        name: name,
        phone: phone,
        email: email,

    }
}
