const fs = require('fs');
const fsExtra = require('fs-extra');

const requiredPackage = './node_modules/sass-list';
const fallbackPackage = '../sass-list';

// Check to see if the required sass-list module exists at the required location.
// This protect the user from need to configure their sass compiler to find this package.
fs.access(requiredPackage, fs.constants.R_OK, (err) => {
	if (err) {

		fsExtra.copy(fallbackPackage, requiredPackage, (err) => {
			return console.error('Copied Sass-list');
			if (err) {
				return console.error(err);
			}
		});

	}
});
