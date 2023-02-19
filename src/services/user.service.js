import { utilService } from '@/services/util.service.js'
import { eventBus } from '@/services/eventBus.service.js'

const users = [
    {
        "_id": "user101",
        "name": "Muki Ben David",
        "password": "123123",
        "balance": 100,
        "transactions": []
    },
    {
        "_id": "user102",
        "name": "Puki Ben David",
        "balance": 100,
        "transactions": []
    }
]


import { dbService } from './db.service.js'
const USER_KEY = 'users'
const LOGGEDIN_USER = 'loggedin_user'

export const userService = {
    query,
    getUser,
    remove,
    login,
    signup,
    getLoginToken,
    signupTest
}

async function signupTest() {
    signup('Puki Ben David', 123123)
    signup('Muki Ben David', 123123)
    console.log(users)
}

async function getLoginToken() {
    const loggedin = await dbService.getLoggedInUser()
    return Promise.resolve(loggedin)
}

function query(filterBy) {
    let filteredUsers = users
    return Promise.resolve(filteredUsers)
}

function getUser(userId) {
    const user = users.find(user => user._id === userId)
    if (!user) return Promise.reject('User not found')
    return Promise.resolve(user)
}

function remove(userId) {
    const idx = users.findIndex(user => user._id === userId)
    if (idx === -1) return Promise.reject('No such user')
    users.splice(idx, 1)
}

async function signup(name, password) {
    localStorage.loggedin_user = []
    const user = []
    const users = await dbService.query()
    if (!users) {
        users = []
    }
    const userToSave = {
        _id: utilService.makeId(),
        name: name,
        password: password,
        balance: 100,
        transactions: []
    }
    try {
        users.unshift(userToSave)
        user.unshift(userToSave)
        await dbService.insert(USER_KEY, users)
        await dbService.insert(LOGGEDIN_USER, user)
    }
    catch (err) {
        console.log('Error', err, err.massage)
    }
    return userToSave
}

async function login(name, password) {
    const msg = {
        txt: `Wrong username or password`,
        type: 'error',
        timeout: 2500,
    }
    localStorage.loggedin_user = []
    const users = await dbService.query(USER_KEY)
    const user = users.filter(u => u.name === name)
    if (!user.length) {
        eventBus.emit('user-msg', msg)
        return Promise.reject('Login failed')
    }
    await dbService.insert(LOGGEDIN_USER, user)
    return Promise.resolve(user)

}


