'use strict'

module.exports = {
  getSpelling : function(word) {
    if (!word) {
      return 'Well, I am not sure how.';
    }

    var result = '';
    for (var i = 0; i < word.length; i++) {
      result += word[i] + ' ';
    }

    return result;
  }
};
