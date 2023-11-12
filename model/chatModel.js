const mongoose = require("mongoose")

const chatMessageSchema = new mongoose.Schema({
    chats: [{
        sender: {
            type: String
        },
        message: {
            type: String
        },
        timestamp: {
            type: Date
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);