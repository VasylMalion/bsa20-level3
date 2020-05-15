const { UserRepository } = require('../repositories/userRepository');

class UserService {

    getAllUsers() {
        const items = UserRepository.getAll();
        if (!items) {
            return null;
        }
        return items
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    createUser(data) {
        const item = UserRepository.create(data);
        if (!item) {
            return null;
        }
        return item
    }

    updateUser(id, data) {
        const updatedUser = UserRepository.update(id, data);
        if (!updatedUser) {
            return null;
        }
        return updatedUser;
    }

    deleteUser(id) {
        const deletedUser = UserRepository.delete(id);
        if (!deletedUser) {
            return null;
        }
        return deletedUser;
    }
}

module.exports = new UserService();