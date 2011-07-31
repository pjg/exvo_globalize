require 'spec_helper'
require 'json'

describe GlobalizeTranslationsController do

  before do
    @title = Factory(:title)
  end

  describe "#index JSON" do
    before do
      get :index, :format => :json
      @translations = JSON.parse(response.body)
    end

    it "returns a non-empty JSON" do
      @translations.present?.should be_true
    end

    it "returns a JSON with default_locale" do
      @translations["default_locale"].should eq(I18n.default_locale.to_s)
    end

    it "returns a JSON with translations" do
      @translations["en"]["title"].should eq(@title.value)
    end
  end

end
