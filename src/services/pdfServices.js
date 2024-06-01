const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePdf = (user, pdfPath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(pdfPath);

        doc.pipe(stream);

        doc.text(`First Name: ${user.firstName}`);
        doc.text(`Last Name: ${user.lastName}`);
        doc.text(`Phone Number: ${user.phoneNumber}`);
        doc.text(`Email: ${user.email}`);

        doc.end();

        stream.on('finish', () => {
            resolve();
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = {
    generatePdf
};
