const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {

    getAllFighters() {
        const items = FighterRepository.getAll();
        if (!items) {
            return null;
        }
        return items
    }

    searchFighter(search) {
        const item = FighterRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    createFighter(data) {
        const item = FighterRepository.create(data);
        if (!item) {
            return null;
        }
        return item
    }

    updateFighter(id, data) {
        const updatedUser = FighterRepository.update(id, data);
        if (!updatedUser) {
            return null;
        }
        return updatedUser;
    }

    deleteFighter(id) {
        const deletedUser = FighterRepository.delete(id);
        if (!deletedUser) {
            return null;
        }
        return deletedUser;
    }
}

module.exports = new FighterService();