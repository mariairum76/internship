// BASIC GENERIC FUNCTION
function identity<T>(value: T): T {
  return value;
}

identity<string>("Hello");
identity<number>(10);

// GENERIC ARRAY FUNCTION
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// GENERIC HOOK STYLE EXAMPLE
function useState<T>(initial: T): [T, (val: T) => void] {
  let state = initial;

  function setState(val: T) {
    state = val;
  }

  return [state, setState];
}