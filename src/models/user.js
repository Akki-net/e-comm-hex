import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, lowercase: true, minLength: 3 },
    email: {
        type: String, required: 'Email address is required', unique: true,
        lowercase: true,
        trim: true,
        validate: [
            {
                validator: function (email) {
                    const re = /^[\w+.-]+@[\w+.-]+\.[a-zA-Z]{2,}$/;
                    return re.test(email);
                },
                message: 'Please provide a valid email address',
            },
        ],
    },
    hashPass: { type: String, required: true }
})

export default mongoose.models?.User || mongoose.model("User", userSchema)