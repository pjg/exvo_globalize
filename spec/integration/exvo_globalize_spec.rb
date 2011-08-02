require 'spec_helper'

describe ExvoGlobalize do
  before do
    @example = Factory(:example)
    @title = Factory(:title)
    @title_pl = Factory(:title_pl)

    I18n.load_path = ['spec/fixtures/locales/en.yml']
  end

  it "respects the default_locale setting" do
    I18n.default_locale.should eq(:en)
  end

  it "provides a valid translation for a given key" do
    I18n.translate(:example).should eq(@example.value)
  end

  it "falls back to the YAML file if the translation is missing in the GlobalizeStore backend (db)" do
    I18n.translate('yaml.title').should eq('YAML Title')
  end

  it "prioritizes the translations from GlobalizeStore backend (db) over others" do
    I18n.translate(:title).should eq(@title.value)
  end

  it "lists available_translations from the Simple backend (YAML files)" do
    simple_backend = I18n.backend.backends.detect { |backend| backend.is_a?(I18n::Backend::Simple) }
    simple_backend.available_translations[:en][:title].should eq('YAML Title')
  end

  it "caches translations in memory" do
    old = I18n.translate(:example)
    new = 'New example'

    @example.update_attributes(:value => new)
    @example.reload
    @example.value.should eq(new)

    I18n.translate(:example).should eq(old)
  end
end
