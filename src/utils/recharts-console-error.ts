// required this function to element this issue: https://github.com/recharts/recharts/issues/3615
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function hideRechartsConsoleError() {
  const error = console.error;
  return (console.error = (...args: any) => {
    if (/Invalid prop `data-headlessui-state`/.test(args[0])) return;
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  });
}
