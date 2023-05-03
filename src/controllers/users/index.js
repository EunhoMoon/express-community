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

    getUsers(req, res, next) {
        try {
            res.status(200).json({users: this.users});
        } catch (err) {
            next(err);
        }
    }

    getUser(req, res, next) {
        try {
            const {id} = req.params;
            console.log(id);
            console.log(typeof id);
            const user = this.users.find(user => user.id === Number(id));

            if (!user) {
                throw {status: 404, message: '사용자를 찾을 수 없습니다.'};
            }

            res.status(200).json({user});
        } catch (err) {
            next(err);
        }
    }

    createUser(req, res, next) {
        try {
            const {name, age} = req.body;

            this.users.push({
                id: new Date().getTime(),
                name: name,
                age: age
            });

            res.status(201).json({users: this.users});
        } catch (err) {
            next(err);
        }
    }

    updateUser(req, res, next) {
        try {
            const {id} = req.params;
            const {name, age} = req.body;

            const targetUserIdx = this.users.findIndex(user => user.id === Number(id));

            this.users[targetUserIdx] = {
                id: this.users[targetUserIdx].id,
                name: name ?? this.users[targetUserIdx].name,
                age: age ?? this.users[targetUserIdx].age
            };

            res.status(204).json({});
        } catch (err) {
            next(err);
        }
    }

    deleteUser(req, res) {
        try {
            const {id} = req.params;
            this.users = this.users.filter(user => user.id !== Number(id));

            res.status(204).json({});
        } catch (err) {
            next(err);
        }
    }
}

const userController = new UserController();
export default userController;