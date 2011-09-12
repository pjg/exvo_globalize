describe("Basic translation functionality", function() {

  it("translates the phrase", function() {
    expect(I18n.translate("new")).toEqual("New")
  })

  it("translates the phrase for the 'pl' locale", function() {
    I18n.locale = "pl"
    expect(I18n.translate("new")).toEqual("Nowy")
    I18n.locale = "en"
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

describe("Default value fallback", function() {

  it("ignores defaultValue if translation is found", function() {
    expect(I18n.t("new", {defaultValue: "Not that new"})).toEqual("New")
  })

  it("returns defaultValue if translation is not found", function() {
    expect(I18n.t("non-existing-key", {defaultValue: "Not that new"})).toEqual("Not that new")
  })

  it("uses defaultValue to do another lookup if it starts with ':'", function() {
    expect(I18n.t("non-existing-key", {defaultValue: ":new"})).toEqual("New")
  })

  it("allows an Array as defaultValue and keeps checking each of its keys for translation", function() {
    expect(I18n.t("non-existing-key", {defaultValue: [":missing", ":new"]})).toEqual("New")
  })

  it("applies the same scope to the defaultValue as it does to the key", function() {
    expect(I18n.t("non-existing-key", {scope: "page", defaultValue: [":title"]})).toEqual("Title")
  })

})

describe("Locale fallback", function() {

  it("falls back to I18n.default_locale when there is no translation available for the requested locale", function() {
    I18n.locale = "pl"
    expect(I18n.t("title", {scope: "page"})).toEqual("Title")
    I18n.locale = "en"
  })

})
