export const toLowerFirstLetter = str =>
  str.charAt(0).toLowerCase() + str.slice(1);

export const extractError = e => {
  if (e.data && e.data.message) {
    return e.data.message;
  }
  return `Error ${e.status}`;
};

export const docsToArray = querySnapshot => {
  const result = [];
  querySnapshot.forEach(doc => {
    result.push({ id: doc.id, ...doc.data() });
  });
  return result;
};
