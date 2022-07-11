var fs = require('fs');

path = './documentation';

let files = fs.readdirSync(path).filter(fn => fn.match(/^module-.*html/));

for (fName of files) {
    let fContent = fs.readFileSync(`${path}/${fName}`).toString();
    fContent = fContent.replace(/<h5>Parameters(.|\n)*<\/table>/, '');
    fs.writeFileSync(`${path}/${fName}`, fContent);
}