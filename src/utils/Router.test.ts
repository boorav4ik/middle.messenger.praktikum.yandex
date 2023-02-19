import sinon from "sinon";
import { expect } from "chai";
import { router } from "./Router";
import { Block } from "./Block";

describe("Test Router", () => {
  const { back: originBack, forward: originForward } = global.window.history;

  const getContent = sinon.fake.returns(document.createElement("div"));

  const MockPageBlock = class {
    getContent = getContent;
  };

  global.window.history.back = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  global.window.history.forward = () => {
    if (typeof window.onpopstate === "function") {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    router.reset();
  });

  after(() => {
    global.window.history.back = originBack;
    global.window.history.forward = originForward;
  });

  it(".use() shoud return Router instance", () => {
    const value = router.use("/", MockPageBlock as unknown as typeof Block);

    expect(value).to.eq(router);
  });

  describe("actions", () => {
    beforeEach(() => {
      router.use("/", MockPageBlock as unknown as typeof Block).start();
    });

    it(".start() get content page", () => {
      expect(getContent.callCount).to.eq(1);
    });

    it(".back() get content page", () => {
      router.back();
      expect(getContent.callCount).to.eq(3);
    });

    it(".forward() get content page", () => {
      router.forward();
      expect(getContent.callCount).to.eq(5);
    });

    it(".go() to non-existen page", () => {
      router.go("/abc");
      expect(getContent.callCount).to.eq(6);
    });
  });
});
