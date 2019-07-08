
import errorCode from './error.code'
export default errorObj => {
  return `${errorCode[errorObj.code]}`;
};
