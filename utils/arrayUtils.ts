export function sortByProperty<T>(array: T[], property: keyof T, descending: boolean = false): T[] {
  return array.sort((a, b) => {
    if (a[property] < b[property]) return descending ? 1 : -1;
    if (a[property] > b[property]) return descending ? -1 : 1;
    return 0;
  });
}

export function removeDuplicates<T>(array: T[], key: keyof T): T[] {
  return array.filter((item, index, self) => self.findIndex(t => t[key] === item[key]) === index);
}

export function filterByProperty<T>(array: T[], property: keyof T, value: any): T[] {
  return array.filter(item => item[property] !== value);
}

export function filterByNonNullProperty<T>(array: T[], property: keyof T): T[] {
  return array.filter(item => item[property] !== null);
}

export function applyAllFiltersAndSorts<T>(array: T[], sortProperty: keyof T, descending: boolean, uniqueKey: keyof T, nonNullProperties: (keyof T)[], filterProperties: { property: keyof T, value: any }[]): T[] {
  let result = sortByProperty(array, sortProperty, descending);
  result = removeDuplicates(result, uniqueKey);
  nonNullProperties.forEach(property => {
    result = filterByNonNullProperty(result, property);
  });
  filterProperties.forEach(filter => {
    result = filterByProperty(result, filter.property, filter.value);
  });
  return result;
}