const fs = require('fs');
const json = JSON.parse(fs.readFileSync('tmp_trans.json', 'utf8'));

eval(fs.readFileSync('src/i18n/translations.js', 'utf8').replace('export const resources', 'global.resources'));

for (const lang in json) {
  Object.assign(global.resources[lang].translation, json[lang]);
}

fs.writeFileSync('src/i18n/translations.js', 'export const resources = ' + JSON.stringify(global.resources, null, 2) + ';\n');
console.log('Corporate, Contact Translations updated successfully.');
