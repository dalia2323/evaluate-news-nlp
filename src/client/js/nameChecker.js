import validUrl from 'valid-url'; 

const isValidUrl = (url) => Boolean(validUrl.isWebUri(`${url}`));

export { isValidUrl }; // صحيح
