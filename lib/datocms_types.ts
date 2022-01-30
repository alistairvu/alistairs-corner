/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
export const isBlogImageRecord = (o: any): o is BlogImageRecord =>
  o.__typename === 'BlogImageRecord';
