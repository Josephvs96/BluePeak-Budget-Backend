const checkGroup = (req, res, next) => {
	const groups = ['1', '2', '3'];
	const group = req.params.group;
	if (!group) {
		return res.status(400).send({
			error:
				'No group were specified in the URL, please provide your group number, ex: domain.com/1/login',
		});
	}

	if (!groups.includes(group)) {
		return res.status(400).send({
			error: `${group} is not a valid group number`,
		});
	}

	next();
};

module.exports = checkGroup;
