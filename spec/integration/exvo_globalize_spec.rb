require 'spec_helper'

describe ExvoGlobalize do

  I18n.load_path = ['spec/fixtures/locales/en.yml']

  let(:i18n_example) { Factory(:i18n_example) }
  let(:i18n_nested_example) { Factory(:i18n_nested_example) }
  let(:i18n_title) { Factory(:i18n_title) }

  it "respects the default_locale setting" do
    I18n.default_locale.should eq(:en)
  end

  it "provides a valid translation for a given key" do
    i18n_example.value.should eq(I18n.t(:example))
  end

  it "provides a valid translation for a scoped key" do
    i18n_nested_example.value.should eq(I18n.t(:example, :scope => [:nested]))
  end

  context "translation storage" do
    let(:hello_world) { 'Hello world' }
    let(:hello_earth) { 'Hello Earth' }
    let(:globalize_store_backend) { I18n.backend.backends.detect { |backend| backend.is_a?(I18n::Backend::GlobalizeStore) } }

    it "stores nested translations in the GlobalizeStore backend" do
      globalize_store_backend.store_translations(I18n.locale, { :hello => { :world => hello_world} })
      I18n.translate('hello.world').should eql(hello_world)
    end

    it "stores flatten translation in the GlobalizeStore backend" do
      globalize_store_backend.store_flatten_translation(I18n.locale, 'hello.earth', hello_earth)
      I18n.translate(:earth, :scope => [:hello]).should eql(hello_earth)
    end
  end

  it "falls back to the YAML file if the translation is missing in the GlobalizeStore backend (db)" do
    I18n.translate('yaml.title').should eq('YAML Title')
  end

  it "prioritizes the translations from GlobalizeStore backend (db) over others" do
    i18n_title.value.should eq(I18n.translate(:title))
  end

  it "lists available_translations from the Simple backend (YAML files)" do
    simple_backend = I18n.backend.backends.detect { |backend| backend.is_a?(I18n::Backend::Simple) }
    simple_backend.available_translations[:en][:title].should eq('YAML Title')
  end

end
