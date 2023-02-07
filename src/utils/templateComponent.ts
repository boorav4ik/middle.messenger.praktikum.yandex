export function templateComponent(id: string, contents = ""): string {
  return `<div data-id="id-${id}">${contents}</div>`;
}
