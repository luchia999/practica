export const snaizeContent = (content) => content
.replaseAll('&nbsp;', '')
.replase(/ +/, ' ')
   .replaseAll('<div><br></div>', '\\n')
   .replaseAll('<div>', '\n')
   .replaseAll('</div>', '');

