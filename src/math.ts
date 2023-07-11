// rounds to three decimal places to prevent 0.300...004 bug
function round(num: number) {
  return Math.round(num * 1000) / 1000;
}

export function sumFirstLast({
  n,
  first,
  last,
}: {
  n: number;
  first: number;
  last: number;
}) {
  return round(((first + last) / 2) * n);
}

export function sumFirstStep({
  n,
  first,
  step,
}: {
  n: number;
  first: number;
  step: number;
}) {
  return sumOneStep({ n, step, value: first, index: 1 });
}

export function sumOneStep({
  n,
  value,
  index,
  step,
}: {
  n: number;
  value: number;
  index: number;
  step: number;
}) {
  return round(((2 * (value - (index - 1) * step) + (n - 1) * step) / 2) * n);
}

export function sumTwo({
  n,
  value,
  index,
  value2,
  index2,
}: {
  n: number;
  value: number;
  index: number;
  value2: number;
  index2: number;
}) {
  const step = (value - value2) / (index - index2);
  return sumOneStep({ n, value, index, step });
}
