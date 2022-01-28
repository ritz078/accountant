export function invariant(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(`Assertion failed: ${message || "Condition not met"}
For further assistance, please go to: https://pspdfkit.com/support/request`);
  }
}
