import { expect } from "chai";
import { Block } from "./Block";

const TEST = "test_test_test";

describe("Test Block", () => {
  class MockComponnent extends Block {
    protected render(): string {
      return "<div>{{text}}</div>";
    }
  }

  it("render Commponent", () => {
    const component = new MockComponnent({ text: TEST });

    expect(component.getContent()?.textContent).to.eq(TEST);
  });

  it("setProps", () => {
    const TEST2 = "TEST2";
    const component = new MockComponnent({ text: TEST });

    component.setProps({ text: TEST2 });

    expect(component.getContent()?.textContent).to.eq(TEST2);
  });
});
