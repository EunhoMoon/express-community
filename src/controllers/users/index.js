import {Router} from "express";

class UserController {
    router;
    path = '/users';
    users = [
        {
            id: 1,
            name: 'EunHo',
            age: 32
        }
    ];

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/detail/:id', this.getUser.bind(this));
        this.router.post('/', this.createUser.bind(this));
        this.router.patch('/:id', this.updateUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));
    }

    getUsers(req, res) {
        res.status(200).json({users: this.users});
    }

    getUser(req, res) {
        const {id} = req.params;
        const user = users.find(user => user.id === Number(id));

        res.status(200).json({user});
    }

    createUser(req, res) {
        const {name, age} = req.body;

        this.users.push({
            id: new Date().getTime(),
            name: name,
            age: age
        });
        res.status(201).json({users: this.users});
    }

    updateUser(req, res) {
        const {id} = req.params;
        const {name, age} = req.body;

        const targetUserIdx = this.users.findIndex(user => user.id === Number(id));

        this.users[targetUserIdx] = {
            id: this.users[targetUserIdx].id,
            name: name ?? this.users[targetUserIdx].name,
            age: age ?? this.users[targetUserIdx].age
        };

        res.status(204).json({});
    }

    deleteUser(req, res) {
        const {id} = req.params;
        this.users = this.users.filter(user => user.id !== Number(id));

        res.status(204).json({});
    }
}

const userController = new UserController();
export default userController;