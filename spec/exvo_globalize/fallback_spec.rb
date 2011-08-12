require 'spec_helper'

describe ExvoGlobalize do

  let(:i18n_header) { Factory(:i18n_header) }

  context "locale fallbacks" do

    before { I18n.locale = :pt }

    it "has set a different locale than the default one" do
      I18n.locale.should_not be_eql(I18n.default_locale)
    end

    it "uses translation from the GlobalizeStore backend" do
      i18n_header.value.should eql(I18n.translate(:header))
    end

    it "uses translation from the Simple backend if it is not found in the GlobalizeTranslation backend" do
      simple_backend = I18n.backend.backends.detect { |backend| backend.is_a?(I18n::Backend::Simple) }
      simple_backend.translate(I18n.default_locale, :name).should eql(I18n.translate(:name))
    end

    after { I18n.locale = I18n.default_locale }

  end

end
