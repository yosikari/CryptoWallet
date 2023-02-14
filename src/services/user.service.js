import { utilService } from '@/services/util.service.js'

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
const LOGEDIN_USER = 'logedin_user'

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
    const logedin = await dbService.getLogedInUser()
    return Promise.resolve(logedin)
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
    localStorage.logedin_user = []
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
        await dbService.insert(LOGEDIN_USER, user)
    }
    catch (err) {
        console.log('Error', err, err.massage)
    }
    return userToSave
}

async function login(name, password) {
    localStorage.logedin_user = []
    const users = await dbService.query(USER_KEY)
    const user = users.filter(u => u.name === name)
    if (!user.length) return Promise.reject('Login failed')
    await dbService.insert(LOGEDIN_USER, user)
    return Promise.resolve(user)

}


