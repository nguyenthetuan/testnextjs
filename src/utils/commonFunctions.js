export const _validateDigits = value => {
  const _numberRegex = /^\d+$/;
  const testVal = value || '';
  return _numberRegex.test(testVal);
};

export const numberWithCommas = x => {
  return x !== undefined ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
};

export const removeCommas = x => {
  const newX = x !== undefined ? x.toString() : '';
  let z = '';
  for (let i = 0; i < newX.length; i++) {
    const y = newX.charAt(i);
    if (_validateDigits(y)) {
      z = z.concat(y);
    }
  }
  return z;
};

export const convertConstantsToArray = (options, firstOpt) => {
  let output = [];
  if (options) {
    Object.keys(options).map(key => {
      if (!firstOpt || firstOpt.value !== key) {
        output.push({
          label: options[key],
          value: key
        });
      }
    });
  }

  if (firstOpt) {
    output.unshift(firstOpt);
  }

  return output;
};

export const convertViCharToEngChar = alias => {
  let str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\|\s/g, '-');
  str = str.replace(/ + /g, ' ');
  str = str.replace(/-+/g, '-');
  str = str.trim();
  return str;
};
