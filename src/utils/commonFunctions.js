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

// export const isEmpty = obj => {
//   Object.keys(obj).forEach(key => {
//     if (obj[key] !== undefined && obj[key] !== null) return false;
//   });
//   return true;
// };
