export interface FlattenObjectOptions {
  shouldReplaceArrays?: boolean;
}

export function flattenObject(
  obj: any,
  options: FlattenObjectOptions = {},
): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const flatObject = {} as any;

  for (const propName of Object.keys(obj)) {
    const value = obj[propName];

    if (typeof value === 'object') {
      flattenNestedProperty(propName, value, flatObject, options);
    } else {
      flatObject[propName] = value;
    }
  }

  return flatObject;
}

function flattenNestedProperty(
  parentPropertyName: string,
  source: any,
  result: any,
  options: FlattenObjectOptions,
): void {
  const flattenValue = (value: any, propName: string, resultParam: any) => {
    if (value && typeof value === 'object') {
      flattenNestedProperty(propName, value, resultParam, options);
    } else {
      resultParam[propName] = value;
    }
  };

  if (Array.isArray(source)) {
    if (options.shouldReplaceArrays) {
      result[parentPropertyName] = source;
    } else {
      for (let i = 0; i < source.length; i++) {
        const flatPropertyName = `${parentPropertyName}.${i}`;

        flattenValue(source[i], flatPropertyName, result);
      }
    }
  } else {
    for (const propName of Object.keys(source)) {
      const value = source[propName];
      const flatPropertyName = `${parentPropertyName}.${propName}`;

      flattenValue(value, flatPropertyName, result);
    }
  }
}
