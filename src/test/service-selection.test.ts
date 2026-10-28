import { describe, expect, it } from "vitest";
import { isServiceSelected, services } from "@/data/services";

describe("Selected portal service", () => {
  it("never selects Shopping or other preview services on the homepage", () => {
    expect(services.filter((s) => isServiceSelected(s, "/")).map((s) => s.id)).toEqual([]);
  });
  it("selects only Search on the search route", () => {
    expect(services.filter((s) => isServiceSelected(s, "/search")).map((s) => s.id)).toEqual(["search"]);
  });
  it("selects only News on the news route", () => {
    expect(services.filter((s) => isServiceSelected(s, "/news")).map((s) => s.id)).toEqual(["news"]);
  });
  it("selects only Blog on the blog route", () => {
    expect(services.filter((s) => isServiceSelected(s, "/blog")).map((s) => s.id)).toEqual(["blog"]);
  });
  it("does not select a homepage preview service in the service directory", () => {
    expect(services.filter((s) => isServiceSelected(s, "/services")).map((s) => s.id)).toEqual([]);
  });
});