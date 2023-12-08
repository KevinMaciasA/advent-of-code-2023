function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function lcmOfArray(arr: number[]): number {
  if (arr.length === 1) {
    return arr[0];
  }
  const firstNumber = arr.shift()!;
  const remainingLCM = lcmOfArray(arr);
  return lcm(firstNumber, remainingLCM);
}

export { lcm, lcmOfArray }