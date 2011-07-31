require 'spec_helper'

describe ExvoGlobalize do
  before do
    @title = Factory(:title)
  end

  it "respects the default_locale setting" do
    I18n.default_locale.should eq(:en)
  end

  it "provides a valid translation for a given key" do
    I18n.translate(:title).should eq(@title.value)
  end

  it "caches the translation in memory" do
    old = I18n.translate(:title)
    new = 'New title'

    @title.update_attributes(:value => new)
    @title.reload
    @title.value.should eq(new)

    I18n.translate(:title).should eq(old)
  end
end
