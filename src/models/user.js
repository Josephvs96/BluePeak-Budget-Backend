const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
	{
		firstname: { type: String },
		lastname: { type: String },
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email is invalid');
				}
			},
		},
		password: { type: String },
		address: { type: String },
	},
	{ timestamps: true, strict: false }
);

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) throw new Error('Unable to login');

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) throw new Error('Unable to login');

	return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
