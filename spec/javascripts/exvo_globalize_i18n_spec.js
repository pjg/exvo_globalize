beforeEach(function() {
  I18n.locale = "en"
})

describe("Basic translation functionality", function() {

  it("translates the phrase", function() {
    expect(I18n.translate("world")).toEqual("World")
  })

  it("translates the phrase for the 'pl' locale", function() {
    I18n.locale = "pl"
    expect(I18n.translate("world")).toEqual("Świat")
  })

  it("translates the phrase using I18n.t()", function() {
    expect(I18n.t("world")).toEqual("World")
  })

  it("returns missing translation message when translation is not found", function() {
    expect(I18n.t("missing")).toMatch(/missing translation/)
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

describe("Global short functions", function() {

  it("translates the phrase using t() global function", function() {
    expect(t("world")).toEqual("World")
  })

  it("localizes the number using l() global function", function() {
    expect(l("number", 1)).toEqual("1.000")
  })

})

describe("Default value fallback", function() {

  it("ignores defaultValue if translation is found", function() {
    expect(I18n.t("world", {defaultValue: "New World"})).toEqual("World")
  })

  it("returns defaultValue if translation is not found", function() {
    expect(I18n.t("non-existing-key", {defaultValue: "New World"})).toEqual("New World")
  })

  it("uses defaultValue to do another lookup if it starts with ':'", function() {
    expect(I18n.t("non-existing-key", {defaultValue: ":world"})).toEqual("World")
  })

  it("allows an Array as defaultValue and keeps checking each of its keys for translation", function() {
    expect(I18n.t("non-existing-key", {defaultValue: [":missing", ":world"]})).toEqual("World")
  })

  it("applies the same scope to the defaultValue as it does to the key", function() {
    expect(I18n.t("non-existing-key", {scope: "page", defaultValue: [":title"]})).toEqual("Title")
  })

})

describe("Locale fallback", function() {

  it("falls back to I18n.default_locale when there is no translation available for the requested locale", function() {
    I18n.locale = "pl"
    expect(I18n.t("title", {scope: "page"})).toEqual("Title")
  })

})

describe("Localization of numbers", function() {

  beforeEach(function() {
    I18n.locale = "pl"
  })

  it("localizes numbers with default settings", function() {
    expect(I18n.toNumber(1)).toEqual("1,000")
    expect(I18n.toNumber(1234567)).toEqual("1 234 567,000")
    expect(I18n.toNumber(-1)).toEqual("-1,000")
    expect(I18n.toNumber(-1234567)).toEqual("-1 234 567,000")
  })

  it("localizes numbers with custom options", function() {
    expect(I18n.toNumber(1234.19, {precision: 0})).toEqual("1 234")
    expect(I18n.toNumber(1234, {separator: '-'})).toEqual("1 234-000")
    expect(I18n.toNumber(1234, {delimiter: '-'})).toEqual("1-234,000")
    expect(I18n.toNumber(65, {precision: 4, strip_insignificant_zeros: true})).toEqual("65")
    expect(I18n.toNumber(1.2, {precision: 4, strip_insignificant_zeros: true})).toEqual("1,2")
  })

  it("localizes numbers using localize() function", function() {
    expect(I18n.l("number", 1)).toEqual("1,000")
    expect(I18n.l("number", 1234567)).toEqual("1 234 567,000")
    expect(I18n.l("number", -1)).toEqual("-1,000")
    expect(I18n.l("number", -1234567)).toEqual("-1 234 567,000")
  })
})

describe("Localization of percentages", function() {

  beforeEach(function() {
    I18n.locale = "pl"
  })

  it("localizes percentages with default settings", function() {
    expect(I18n.toPercentage(1234)).toEqual("1234,00%")
  })

  it("localizes percentages with custom options", function() {
    expect(I18n.toPercentage(1234.19, {delimiter: "_", precision: 0})).toEqual("1_234%")
  })

  it("localizes percentages using localize() function", function() {
    expect(I18n.l("percentage", 12)).toEqual("12,00%")
  })

})

describe("Localization of currencies", function() {

  beforeEach(function() {
    I18n.locale = "pl"
  })

  it("localizes currencies with default settings", function() {
    expect(I18n.toCurrency(100.99)).toEqual("PLN 100,99")
    expect(I18n.toCurrency(1000.99)).toEqual("PLN 1 000,99")
  })

  it("localizes currencies with custom options", function() {
    expect(I18n.toCurrency(1234.19, {precision: 0})).toEqual("PLN 1 234")
    expect(I18n.toCurrency(1234, {unit: "zł"})).toEqual("zł 1 234")
    expect(I18n.toCurrency(1234, {separator: "-", strip_insignificant_zeros: false})).toEqual("PLN 1 234-00")
    expect(I18n.toCurrency(1234, {delimiter: ""})).toEqual("PLN 1234")
    expect(I18n.toCurrency(1234, {format: "%n %u"})).toEqual("1 234 PLN")
  })

  it("localizes currencies using localize() function", function() {
    expect(I18n.l("currency", 12)).toEqual("PLN 12")
  })

})

describe("Localization of human sizes", function() {

  beforeEach(function() {
    I18n.locale = "pl"
  })

  it("localizes numbers in human sizes using pluralization rules", function() {
    kb = 1024

    expect(I18n.toHumanSize(1)).toEqual("1bajt")
    expect(I18n.toHumanSize(5)).toEqual("5bajtów")
    expect(I18n.toHumanSize(12)).toEqual("12bajtów")
    expect(I18n.toHumanSize(22)).toEqual("22bajty")

    expect(I18n.toHumanSize(kb)).toEqual("1KB")
    expect(I18n.toHumanSize(kb * 1.5)).toEqual("1,5KB")

    expect(I18n.toHumanSize(kb * kb)).toEqual("1MB")
    expect(I18n.toHumanSize(kb * kb * 1.5)).toEqual("1,5MB")

    expect(I18n.toHumanSize(kb * kb * kb)).toEqual("1GB")
    expect(I18n.toHumanSize(kb * kb * kb * 1.5)).toEqual("1,5GB")

    expect(I18n.toHumanSize(kb * kb * kb * kb)).toEqual("1TB")
    expect(I18n.toHumanSize(kb * kb * kb * kb * 1.5)).toEqual("1,5TB")

    expect(I18n.toHumanSize(kb * kb * kb * kb * kb)).toEqual("1024TB")
  })

  it("localizes numbers in human sizes using custom options", function() {
    expect(I18n.toHumanSize(1024 * 1.6, {precision: 0})).toEqual("2KB")
  })

})

describe("Date parsing", function() {

  beforeEach(function() {
    I18n.locale = "pl"
  })

  it("parses dates", function() {
    expected = new Date(2009, 0, 24, 0, 0, 0)
    actual = I18n.parseDate("2009-01-24")
    expect(actual.toString()).toEqual(expected.toString())

    expected = new Date(2009, 0, 24, 0, 15, 0)
    actual = I18n.parseDate("2009-01-24 00:15:00")
    expect(actual.toString()).toEqual(expected.toString())

    expected = new Date(2009, 0, 24, 0, 0, 15)
    actual = I18n.parseDate("2009-01-24 00:00:15")
    expect(actual.toString()).toEqual(expected.toString())

    expected = new Date(2009, 0, 24, 15, 33, 44)
    actual = I18n.parseDate("2009-01-24 15:33:44")
    expect(actual.toString()).toEqual(expected.toString())

    expected = new Date(2009, 0, 24, 0, 0, 0)
    actual = I18n.parseDate(expected.getTime())
    expect(actual.toString()).toEqual(expected.toString())

    expected = new Date(2009, 0, 24, 0, 0, 0)
    actual = I18n.parseDate("01/24/2009")
    expect(actual.toString()).toEqual(expected.toString())

    expected = new Date(2009, 0, 24, 14, 33, 55)
    actual = I18n.parseDate(expected).toString()
    expect(actual).toEqual(expected.toString())

    expected = new Date(2009, 0, 24, 15, 33, 44)
    actual = I18n.parseDate("2009-01-24T15:33:44")
    expect(actual.toString()).toEqual(expected.toString())

    expected = new Date(Date.UTC(2009, 0, 24, 15, 33, 44))
    actual = I18n.parseDate("2009-01-24T15:33:44Z")
    expect(actual.toString()).toEqual(expected.toString())
  })

  it("formats dates", function() {
    // 2009-04-26 19:35:44 (Sunday)
    var date = new Date(2009, 3, 26, 19, 35, 44)

    // short week day
    expect(I18n.strftime(date, "%a")).toEqual("nie")

    // full week day
    expect(I18n.strftime(date, "%A")).toEqual("niedziela")

    // short month
    expect(I18n.strftime(date, "%b")).toEqual("kwi")

    // full month
    expect(I18n.strftime(date, "%B")).toEqual("kwiecień")

    // day
    expect(I18n.strftime(date, "%d")).toEqual("26")

    // 24-hour
    expect(I18n.strftime(date, "%H")).toEqual("19")

    // 12-hour
    expect(I18n.strftime(date, "%I")).toEqual("07")

    // month
    expect(I18n.strftime(date, "%m")).toEqual("04")

    // minutes
    expect(I18n.strftime(date, "%M")).toEqual("35")

    // meridian
    expect(I18n.strftime(date, "%p")).toEqual("po południu")

    // seconds
    expect(I18n.strftime(date, "%S")).toEqual("44")

    // week day
    expect(I18n.strftime(date, "%w")).toEqual("0")

    // short year
    expect(I18n.strftime(date, "%y")).toEqual("09")

    // full year
    expect(I18n.strftime(date, "%Y")).toEqual("2009")

    // full date
    expect(I18n.strftime(date, "%d. %B %Y, godzina %H:%M")).toEqual("26. kwiecień 2009, godzina 19:35")
  })

  it("formats dates without padding", function() {
    // 2009-04-26 19:35:44 (Sunday)
    var date = new Date(2009, 3, 9, 7, 8, 9)

    // 24-hour without padding
    expect(I18n.strftime(date, "%-H")).toEqual("7")

    // 12-hour without padding
    expect(I18n.strftime(date, "%-I")).toEqual("7")

    // minutes without padding
    expect(I18n.strftime(date, "%-M")).toEqual("8")

    // seconds without padding
    expect(I18n.strftime(date, "%-S")).toEqual("9")

    // short year without padding
    expect(I18n.strftime(date, "%-y")).toEqual("9")

    // month without padding
    expect(I18n.strftime(date, "%-m")).toEqual("4")

    // day without padding
    expect(I18n.strftime(date, "%-d")).toEqual("9")
  })

  it("formats dates with padding", function() {
    // 2009-04-26 19:35:44 (Sunday)
    var date = new Date(2009, 3, 9, 7, 8, 9)

    // 24-hour
    expect(I18n.strftime(date, "%H")).toEqual("07")

    // 12-hour
    expect(I18n.strftime(date, "%I")).toEqual("07")

    // minutes
    expect(I18n.strftime(date, "%M")).toEqual("08")

    // seconds
    expect(I18n.strftime(date, "%S")).toEqual("09")

    // short year
    expect(I18n.strftime(date, "%y")).toEqual("09")

    // month
    expect(I18n.strftime(date, "%m")).toEqual("04")

    // day
    expect(I18n.strftime(date, "%d")).toEqual("09")
  })

  it("formats dates with negative time zone", function() {
    var date = new Date(2009, 3, 26, 19, 35, 44)
    spyOn(date, "getTimezoneOffset").andReturn(345)

    expect(I18n.strftime(date, "%z")).toMatch(/^(\+|-)[\d]{4}$/)
    expect(I18n.strftime(date, "%z")).toEqual("-0545")
  })

  it("formats dates with positive time zone", function() {
    var date = new Date(2009, 3, 26, 19, 35, 44)
    spyOn(date, "getTimezoneOffset").andReturn(-345)

    expect(I18n.strftime(date, "%z")).toMatch(/^(\+|-)[\d]{4}$/)
    expect(I18n.strftime(date, "%z")).toEqual("+0545")
  })


  it("formats dates using hour12 values", function() {
    var date = new Date(2009, 3, 26, 19, 35, 44)
    expect(I18n.strftime(date, "%I")).toEqual("07")

    date = new Date(2009, 3, 26, 12, 35, 44)
    expect(I18n.strftime(date, "%I")).toEqual("12")

    date = new Date(2009, 3, 26, 0, 35, 44)
    expect(I18n.strftime(date, "%I")).toEqual("12")
  })

  it("parses and formats a Ruby Time.now.to_s string", function() {
    // the `Time.now` string below is devoid of timezone information; this way this test can pass in different timezones
    expect(I18n.strftime(I18n.parseDate("Wed Sep 14 12:03:11 2011"), "%Y/%m/%d %H:%M")).toEqual("2011/09/14 12:03")
  })

  it("localizes date strings", function() {
    expect(I18n.l("date.formats.default", "2009-11-29")).toEqual("29-11-2009")
    expect(I18n.l("date.formats.short", "2009-01-07")).toEqual("07 sty")
    expect(I18n.l("date.formats.long", "2009-01-07")).toEqual("styczeń 07, 2009")
  })

  it("localizes time strings", function() {
    expect(I18n.l("time.formats.default", "2009-11-29 15:07:59")).toMatch("nie, 29 lis 2009 15:07:59")
    expect(I18n.l("time.formats.short", "2009-01-07 09:12:35")).toEqual("07 sty 09:12")
    expect(I18n.l("time.formats.long", "2009-11-29 15:07:59")).toEqual("listopad 29, 2009 15:07")
  })

})

describe("Pluralizations", function() {

  it("correctly pluralizes the English phrase", function() {
    I18n.locale = "en"
    expect(I18n.t("contact", {count: 1})).toEqual("1 Contact")
    expect(I18n.t("contact", {count: 2})).toEqual("2 Contacts")
    expect(I18n.t("contact", {count: 22})).toEqual("22 Contacts")
  })

  it("correctly pluralizes the French phrase", function() {
    I18n.locale = "fr"
    expect(I18n.t("contact", {count: 0})).toEqual("0 contact")
    expect(I18n.t("contact", {count: 1})).toEqual("1 contact")
    expect(I18n.t("contact", {count: 2})).toEqual("2 contacts")
    expect(I18n.t("contact", {count: 5})).toEqual("5 contacts")
  })

  it("correctly pluralizes the Polish phrase", function() {
    I18n.locale = "pl"
    expect(I18n.t("contact", {count: 1})).toEqual("1 Kontakt")
    expect(I18n.t("contact", {count: 2})).toEqual("2 Kontakty")
    expect(I18n.t("contact", {count: 5})).toEqual("5 Kontaktów")
    expect(I18n.t("contact", {count: 12})).toEqual("12 Kontaktów")
    expect(I18n.t("contact", {count: 22})).toEqual("22 Kontakty")
  })

  it("correctly pluralizes the Portuguese phrase", function() {
    I18n.locale = "pt"
    expect(I18n.t("contact", {count: 0})).toEqual("0 Contato")
    expect(I18n.t("contact", {count: 1})).toEqual("1 Contato")
    expect(I18n.t("contact", {count: 2})).toEqual("2 Contatos")
    expect(I18n.t("contact", {count: 22})).toEqual("22 Contatos")
  })

})
