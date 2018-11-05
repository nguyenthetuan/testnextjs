export const generateClientError = (code, message) => {
  switch (code) {
    case 400:
      return {
        code: 400,
        message: message || 'Mất kết nối tới máy chủ'
      };
    case 500:
      return {
        code: 500,
        message: message || 'Mất kết nối tới máy chủ'
      };
    default:
      return {
        code: 500,
        message: message || 'Mất kết nối tới máy chủ'
      };
  }
};
