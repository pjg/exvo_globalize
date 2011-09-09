describe("Basic translation functionality", function() {

  it("translates the phrase using I18n.translate()", function() {
    expect(I18n.translate("new")).toEqual("New")
  })

  it("translates the phrase using I18n.t()", function() {
    expect(I18n.t("new")).toEqual("New")
  })

  it("translates the phrase using t() global shortcut function", function() {
    expect(t("new")).toEqual("New")
  })

  it("returns null when translation is not found", function() {
    expect(I18n.t("non-existing-key")).toBeNull()
  })

  it("translates the phrase using scoped key with dots as separators", function() {
    expect(I18n.t("page.intro.heading")).toEqual("Heading")
  })

  it("translates the phrase using dotted string scope param", function() {
    expect(I18n.t("heading", {scope: "page.intro"})).toEqual("Heading")
  })

  it("translates the phrase using Array scope param", function() {
    expect(I18n.t("heading", {scope: ["page", "intro"]})).toEqual("Heading")
  })

  it("supports interpolation during translation", function() {
    expect(I18n.t("hello", {name: "John"})).toEqual("Hello John!")
  })

})
