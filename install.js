const fs = require('fs-extra');

const requiredPath = './node_require/sass-list';
const sourcePaths = ['./node_modules/sass-list', '../sass-list'];

// Check to see if the required module exists at the required location.
// This protects the user from needing to configure their sass compiler to find this package.
fs.access(requiredPath, fs.constants.R_OK, (err) => {
	if (err) {
		let errors = [];

		const success = sourcePaths.some((sourcePath) => {

			try {
				fs.copySync(sourcePath, requiredPath);
				return true;
			}
			catch (err) {
				errors.push[err];
			}

			return false;

		});

		if (!success) {
			errors.forEach((error) => console.log(error));
		}
	}
});
