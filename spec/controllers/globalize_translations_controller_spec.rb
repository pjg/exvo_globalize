require 'spec_helper'
require 'json'

describe GlobalizeTranslationsController do

  let(:i18n_title) { Factory(:i18n_title) }

  describe "#index as JSON" do

    let(:translations) do
      i18n_title # needed so there is some data in the database before a call to get :index
      get :index, :format => :json
      JSON.parse(response.body)
    end

    it "returns a non-empty JSON" do
      translations.present?.should be_true
    end

    it "returns a JSON with default_locale" do
      translations["default_locale"].should eq(I18n.default_locale.to_s)
    end

    it "returns a JSON with translations" do
      i18n_title.value.should eq(translations["en"]["title"])
    end

  end

  describe "#index as HTML" do

    context "without being logged in" do
      before do
        get :index, :format => :html
      end

      it { should respond_with(:forbidden) }
    end

    context "when being logged in as admin" do
      before do
        controller.stub!(:require_admin).and_return(true)
        get :index, :format => :html
      end

      it { should respond_with(:success) }
    end

  end

end
