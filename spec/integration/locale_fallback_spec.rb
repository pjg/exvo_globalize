require 'spec_helper'

describe ExvoGlobalize do

  I18n.load_path = ['spec/fixtures/locales/en.yml']

  let(:i18n_example) { Factory(:i18n_example) }

  context "locale fallbacks" do

    before { I18n.locale = :pt }

    it "has set a different locale than the default one" do
      I18n.locale.should_not be_eql(I18n.default_locale)
    end

    it "uses translation from the GlobalizeStore backend" do
      i18n_example.value.should eql(I18n.translate(:example))
    end

    it "uses translation from the Simple backend if it is not found in the GlobalizeTranslation backend" do
      simple_backend = I18n.backend.backends.detect { |backend| backend.is_a?(I18n::Backend::Simple) }
      simple_backend.translate(I18n.default_locale, :name).should eql(I18n.translate(:name))
    end

    after { I18n.locale = I18n.default_locale }

  end

end
