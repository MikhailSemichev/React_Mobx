export default {
	required,
	minLength,
	regex
};

function required(error) {
	return (value, values) => {
		if (!value) {
			return error;
		}
		return null;
	};
}

function minLength(length, error) {
	return (value, values) => {
		if (value.length < length) {
			return error;
		}
		return null;
	};
}

function regex(reg, error) {
	return (value, values) => {
		if (!reg.test(value)) {
			return error;
		}
		return null;
	};
}