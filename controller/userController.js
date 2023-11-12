const userModel = require('../model/userModel')

class userController {

    async addNewUser(request, response) {
        try {
            const { firstName, lastName, age, city, designation } = request.body;
            if (!firstName || !lastName || !age || !city || !designation) return response.status(400).send({ code: 400, message: 'Missing required fields' });

            const userData = { firstName, lastName, age, city, designation };

            const savedData = await new userModel(userData).save();
            if (savedData) return response.status(201).send({ code: 201, message: 'New user Added Successfully.', user: savedData });
            else return response.status(500).send({ code: 500, message: 'Failed to add new user' });

        } catch (error) {
            return response.status(500).send({ code: 500, message: 'Internal Server Error', error: error.message });
        }
    }

    async updateUser(request, response) {
        try {
            const { firstName, lastName, age, city, designation, userId } = request.body;
            if (!firstName || !lastName || !age || !city || !designation) return response.status(400).send({ code: 400, message: 'Missing required fields' });

            const findUser = await userModel.findOne({ _id: userId });
            if (findUser === null) return response.status(404).send({ code: 404, message: 'No user found.' });
            else {

                const updateUser = await userModel.updateOne({ _id: userId }, {
                    $set: {
                        firstName: firstName, lastName: lastName, age: age, city: city, designation: designation
                    }
                });
                if (updateUser.modifiedCount > 0) return response.status(200).send({ code: 200, message: 'user updated Successfully.' });
                else return response.status(500).send({ code: 500, message: 'Failed to update user' });
            }
        } catch (error) {
            return response.status(500).send({ code: 500, message: 'Internal Server Error', error: error.message });
        }
    }

    async getUserById(request, response) {
        try {
            const { userId } = request.params;
            if (!userId) return response.status(400).send({ code: 400, message: 'Missing required fields' });
            const findUser = await userModel.findOne({ _id: userId });
            if (findUser === null) return response.status(404).send({ code: 404, message: 'No user found.' });
            else return response.status(200).send({ code: 200, message: 'user found Successfully.', user: findUser });
        } catch (error) {
            return response.status(500).send({ code: 500, message: 'Internal Server Error', error: error.message });
        }
    }

    async getAllusers(request, response) {
        try {
            const users = await userModel.find();
            if (users.length === 0) return response.status(404).send({ code: 404, message: 'No users found.' });
            else return response.status(200).send({ code: 200, message: 'users list found Successfully.', usersList: users });
        } catch (error) {
            return response.status(500).send({ code: 500, message: 'Internal Server Error', error: error.message });
        }
    }

    async deleteUser(request, response) {
        try {
            const { userId } = request.params;
            if (!userId) return response.status(400).send({ code: 400, message: 'Missing required fields' });
            const findUser = await userModel.findOne({ _id: userId });
            if (findUser === null) return response.status(404).send({ code: 404, message: 'No user found' });

            const deleteUser = await userModel.deleteOne({ _id: userId })
            if (deleteUser.deletedCount > 0) return response.status(200).send({ code: 200, message: 'user deleted Successfully.' });
            else return response.status(500).send({ code: 500, message: 'Failed to delete user' });

        } catch (error) {
            return response.status(500).send({ code: 500, message: 'Internal Server Error', error: error.message });
        }
    }

}

module.exports = new userController()