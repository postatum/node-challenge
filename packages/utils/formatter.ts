export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function secureTrim(allData, fields): string {
  const data = {};
  fields.forEach((field) => {
    data[field] = allData[field];
  });
  return data;
}
