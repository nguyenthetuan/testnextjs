import LocalizedStrings from 'react-localization';
import en from './l18n/en.json';
import vi from './l18n/vi.json';

const strings = new LocalizedStrings({
  en: {
    components: {
      AddressInput: en.components.AddressInput
    }
  },
  vi: {
    components: {
      AddressInput: en.components.AddressInput
    }
  },
  jp: {
    components: {
      AddressInput: vi.components.AddressInput
    }
  }
});

export default strings;