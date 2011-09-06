require 'spec_helper'

describe ExvoGlobalize do

  let(:i18n_header) { Factory(:i18n_header) }
  let(:i18n_nested_header) { Factory(:i18n_nested_header) }
  let(:i18n_title) { Factory(:i18n_title) }

  # invalidate #available_translations cache before each run
  before { I18n.backend.instance_variable_set(:@available_translations, nil) }

  it "respects the default_locale setting" do
    I18n.default_locale.should eq(:en)
  end

  it "provides a valid translation for a given key" do
    i18n_header.value.should eq(I18n.t(:header))
  end

  it "provides a valid translation for a scoped key" do
    i18n_nested_header.value.should eq(I18n.t(:header, :scope => [:nested]))
  end

  context "translation storage" do
    let(:hello_world) { 'Hello world' }
    let(:hello_earth) { 'Hello Earth' }
    let(:hello_mars) { 'Hello Mars' }

    it "stores a flatten translations hash" do
      I18n.backend.store_flatten_translations({ :en => { 'hello.world' => hello_world, 'hello.earth' => hello_earth } })
      I18n.translate('hello.world').should eql(hello_world)
      I18n.translate('hello.earth').should eql(hello_earth)
    end

    it "stores a flatten translation" do
      I18n.backend.store_flatten_translation(I18n.locale, 'hello.mars', hello_mars)
      I18n.translate(:mars, :scope => [:hello]).should eql(hello_mars)
    end

    it "stores a nested translations hash" do
      I18n.backend.store_nested_translations({ :en => { :nested => { :hello => hello_world } } })
      I18n.translate(:hello, :scope => :nested).should eql(hello_world)
    end

    it "stores a nested translation" do
      I18n.backend.store_translations(I18n.locale, { :hello => { :world => hello_world } })
      I18n.translate('hello.world').should eql(hello_world)
    end
  end

  it "falls back to the YAML file if the translation is missing in the GlobalizeStore backend (db)" do
    I18n.translate('yaml.title').should eq('YAML Nested Title')
  end

  it "prioritizes the translations from GlobalizeStore backend (db) over others" do
    i18n_title.value.should eq(I18n.translate(:title))
  end

  it "lists available_translations from the Simple backend (YAML files)" do
    I18n.backend.simple.available_translations[:en][:yaml][:title].should eq('YAML Nested Title')
  end

  it "lists available translations from the GlobalizeStore backend" do
    i18n_nested_header.value.should eq(I18n.backend.globalize_store.available_translations[:en][:nested][:header])
  end

  it "lists available app translations" do
    I18n.backend.available_app_translations[:en][:helpers][:select].has_key?(:prompt).should be_true
  end

  it "lists all available translations" do
    I18n.backend.available_translations[:en][:yaml][:title].should eql('YAML Nested Title')
  end

  it "lists all available translations prioritizing the GlobalizeStore backend" do
    i18n_title.value.should eql(I18n.backend.available_translations[:en][:title])
  end

  it "excludes fixtures from app_translations and does so without breaking the I18n.load_path" do
    I18n.backend.available_app_translations[:en].has_key?(:title).should be_false
    I18n.backend.available_translations[:en].has_key?(:title).should be_true
  end

end
