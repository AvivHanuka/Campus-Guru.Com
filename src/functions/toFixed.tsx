function toFixed(value: number, n: number): number | string {
  // Check if the value has a decimal part
  if (value % 1 !== 0) {
    return value.toFixed(n);
  } else {
    return value;
  }
}

export default toFixed;
