require 'spec_helper'
require 'json'

describe GlobalizeTranslationsController do

  let(:i18n_title) { Factory(:i18n_title) }

  context "JSON" do

    describe "GET :show" do

      let(:translations) do
        i18n_title # needed so there is some data in the database before a call to get :show
        get :show, :format => :json
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

  end

  context "HTML" do

    describe "GET :show" do

      context "without being logged in" do
        before do
          get :show, :format => :html
        end

        it { should respond_with(:forbidden) }
      end

      context "when being logged in as admin" do
        before do
          controller.stub!(:require_admin).and_return(true)
          get :show, :format => :html
        end

        it { should respond_with(:success) }
      end

    end

    describe "PUT :update" do

      let(:intro) { "Introduction" }
      let(:translations) { { :en => { :intro => intro } } }

      render_views
      let(:page) { Capybara::Node::Simple.new(@response.body) }

      before do
        controller.stub!(:require_admin).and_return(true)
        GlobalizeApp.any_instance.stub(:fetch_translations) { translations }
        put :update, :format => :html
      end

      it "updates the translations" do
        I18n.t(:intro).should eq(intro)
      end

      it "sets a flash notice" do
        flash[:notice].should_not be_empty
      end

      it "displays a flash notice" do
        page.should have_selector('p.notice')
      end

    end

  end

end
