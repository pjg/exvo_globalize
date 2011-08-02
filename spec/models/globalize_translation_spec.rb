require 'spec_helper'

describe GlobalizeTranslation do

  let(:title) { Factory(:title) }
  let(:title_pl) { Factory(:title_pl) }

  it "has a :title key" do
    title.key.should eql('title')
  end

  it "returns all translations for all locales" do
    [title, title_pl].map(&:value).should =~ GlobalizeTranslation.lookup(:title).map(&:value)
  end

  it "returns a translation for scoped locale" do
    title.value.should eq(GlobalizeTranslation.locale('en').lookup(:title).first.value)
  end

  it "lists available locales" do
    [title, title_pl].map(&:locale).map(&:to_sym).should =~ GlobalizeTranslation.available_locales
  end

end
