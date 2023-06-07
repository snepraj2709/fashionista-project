const validateMobileNo = input => {
	return /^[0-9]+$/.test(input);
};
const validatePinCode = input => {
	return /^[0-9]+$/.test(input) && input.length === 6;
};
const validateOnlyString = input => {
	return /^[a-z A-Z]+$/.test(input) || input.length === 0;
};
const validateEmail = input => {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		input.toLowerCase()
	);
};
const validatePassword = input => {
	return /^(?=.{8,20}$)\D*\d/.test(input);
};

export {
	validateMobileNo,
	validatePinCode,
	validateOnlyString,
	validateEmail,
	validatePassword
};
