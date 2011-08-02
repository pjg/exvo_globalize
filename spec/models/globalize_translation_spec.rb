require 'spec_helper'

describe GlobalizeTranslation do

  let(:i18n_title) { Factory(:i18n_title) }
  let(:i18n_title_pl) { Factory(:i18n_title_pl) }

  it "has a :title key" do
    i18n_title.key.should eql('title')
  end

  it "returns all translations for all locales" do
    [i18n_title, i18n_title_pl].map(&:value).should =~ GlobalizeTranslation.lookup(:title).map(&:value)
  end

  it "returns a translation for scoped locale" do
    i18n_title.value.should eq(GlobalizeTranslation.locale('en').lookup(:title).first.value)
  end

  it "lists available locales" do
    [i18n_title, i18n_title_pl].map(&:locale).map(&:to_sym).should =~ GlobalizeTranslation.available_locales
  end

end
