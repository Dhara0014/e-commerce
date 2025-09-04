export function addSpacesToCamelCase(str: string) {
  return str?.length > 0 && str?.replace(/([a-z])([A-Z])/g, '$1 $2');
}
