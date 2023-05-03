import {Router} from "express";
import {CreateUserDTO, UserDTO} from "./dto";

class UserController {
    router;
    path = '/users';
    users = [
        {
            id: 1,
            firstName: 'EunHo',
            lastName: 'Moon',
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
            const users = this.users.map(user => new UserDTO(user));

            res.status(200).json({users: users});
        } catch (err) {
            next(err);
        }
    }

    getUser(req, res, next) {
        try {
            const {id} = req.params;
            const targetUser = this.users.find(user => user.id === Number(id));

            if (!targetUser) {
                throw {status: 404, message: '사용자를 찾을 수 없습니다.'};
            }

            const user = new UserDTO(targetUser);

            res.status(200).json({user});
        } catch (err) {
            next(err);
        }
    }

    createUser(req, res, next) {
        try {
            const {firstName, lastName, age} = req.body;

            if (!firstName || !lastName) {
                throw { state: 400, message: '이름이 없습니다.' }
            }

            const newUser = new CreateUserDTO(firstName, lastName, age).getUser();

            this.users.push(newUser);

            res.status(201).json({users: this.users});
        } catch (err) {
            next(err);
        }
    }

    updateUser(req, res, next) {
        try {
            const {id} = req.params;
            const {firstName, lastName, age} = req.body;

            if (!firstName || !lastName) {
                throw { state: 400, message: '이름이 없습니다.' }
            }

            const targetUserIdx = this.users.findIndex(user => user.id === Number(id));

            this.users[targetUserIdx] = {
                id: this.users[targetUserIdx].id,
                firstName: firstName ?? this.users[targetUserIdx].firstName,
                lastName: lastName ?? this.users[targetUserIdx].lastName,
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