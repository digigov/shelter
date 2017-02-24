/* eslint no-console: 0 */

const fs = require('fs');
// const svg2ttf = require('svg2ttf');
const svgicons2svgfont = require('svgicons2svgfont');
const custom = require('./custom');

const fontStream = svgicons2svgfont({
  fontName: 'CustomIcons',
});

const filename = `${__dirname}/CustomIcons`;

fontStream
  .pipe(fs.createWriteStream(`${filename}.svg`))
  .on('finish', () => {
    console.log('Svg successfully created!');
    // const ttf = svg2ttf(fs.readFileSync(`${filename}.svg`), {});
    // fs.writeFileSync(`${filename}.ttf`, new Buffer(ttf.buffer));
    // console.log('Font successfully created!');
  })
  .on('error', (err) => {
    console.log(err);
  });

Object.keys(custom).forEach((name) => {
  const unicode = custom[name];
  console.log(name, unicode);
  const glyph = fs.createReadStream(`${__dirname}/svg/${name}.svg`);
  glyph.metadata = { name, unicode: [String.fromCharCode(unicode)] };
  fontStream.write(glyph);
});

fontStream.end();
