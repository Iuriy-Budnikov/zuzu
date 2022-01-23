import critical from 'critical';
import fs from 'fs';

const dist = 'build/';

fs.readdir(dist, (err, files) => {
  files.forEach((file) => {
    if (file.indexOf('.html') > -1) {
      critical.generate({
        inline: true,
        base: dist,
        src: file,
        width: 1300,
        height: 900,
        target: {
          css: '_app/assets/critical.css',
          html: file,
          uncritical: '_app/assets/uncritical.css'
        },
        extract: true
      });
    }
  });
});
