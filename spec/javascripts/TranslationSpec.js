describe("Translation", function() {
  
  it("should have text", function() {
    loadFixtures("translations.html")
    expect($(".translations")).toHaveText("test")
  })
  
  it("should have t function working", function() {
    expect(t("new")).toEqual("new")  
  })
})