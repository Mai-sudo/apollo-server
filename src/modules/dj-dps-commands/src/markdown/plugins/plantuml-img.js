'use strict';

/**
 * Client/server plugin
 */

const markdownItContainer = require('markdown-it-container');
const parseAttrs = require('./markit/utils/parseAttrs');

module.exports = function(md) {
  let name = 'plantuml png'
  // ['warn', 'smart', 'ponder'].forEach(name => {
    md.use(markdownItContainer, name, {
      marker: '`',
      render(tokens, idx, options, env, slf) {

        if (tokens[idx].nesting === 1) {
          let attrs = parseAttrs(tokens[idx].info, true);
          let header = attrs.header;
          console.log(tokens)
          if (header) {
            //header = header.replace(/`(.*?)`/g, '<code>$1</code>');
            header = md.renderInline(header);
          } else {
            header = name //t(`markit.outlined.${name}`);
          }
          return `<div class="important important_${name}">
            <div class="important__header"><span class="important__type">${header}</span></div>
            <div class="important__content">`;

        } else {
          // closing tag
          return '</div></div>\n';
        }
      }
    });
  // });



};
