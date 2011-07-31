require 'spec_helper'
require 'json'

describe GlobalizeTranslationsController do

  before do
    @title = Factory(:title)
  end

  describe "#index as JSON" do
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

  describe "#index as HTML" do

    context "without being logged as admin" do
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
