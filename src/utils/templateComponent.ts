export default function templateComponent(id: string, contents: string = ""): string {
    return `<div data-id="id-${id}">${contents}</div>`
}