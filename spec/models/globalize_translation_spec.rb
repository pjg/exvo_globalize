require 'spec_helper'

describe GlobalizeTranslation do
  before do
    @title = Factory(:title)
    @title_pl = Factory(:title_pl)
  end

  it "has a :title key" do
    @title.key.should eql('title')
  end

  it "returns all translations for all locales" do
    GlobalizeTranslation.lookup(:title).map(&:value).should =~ [@title, @title_pl].map(&:value)
  end

  it "returns a translation for scoped locale" do
    GlobalizeTranslation.locale('en').lookup(:title).first.value.should eq(@title.value)
  end

  it "lists available locales" do
    GlobalizeTranslation.available_locales.should =~ [@title, @title_pl].map(&:locale).map(&:to_sym)
  end

end
