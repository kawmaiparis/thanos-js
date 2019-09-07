const confirmation = require('./confirmation');
const snapFingers = require('./snap-fingers');

const main = async () => {
	if (!confirmation.hasConfirmedImplications()) {
		console.log('here');
		await confirmation.showAndConfirmImplications();
	}
	console.log('snapping fingers');
	snapFingers();
	console.log('done');
};

main();
