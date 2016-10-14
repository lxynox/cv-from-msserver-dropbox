var fs = require('fs');

// default path for cv.docx, cv.pdf and remote Dropbox sync folder
const path = {
	src: 'R:\\CV.docx',
	pdf: 'R:\\CV.pdf',
 dest: '/Job/resume/'
};

fs.writeFile('path.json', JSON.stringify(path, null, '\t'), (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log('path.json generated!');
});

fs.readFile('startup.bat', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	fs.writeFile(process.env.APPDATA + '\\Microsoft\\Windows\\Start\ Menu\\Programs\\Startup\\startup.bat', data, (err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(`startup.bat created in ${process.env.USERNAME} startup folder!`);
	});
});
