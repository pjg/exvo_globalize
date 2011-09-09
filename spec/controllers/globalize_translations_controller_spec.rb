require 'spec_helper'
require 'json'

describe GlobalizeTranslationsController do

  render_views
  let(:page) { Capybara::Node::Simple.new(@response.body) }

  context "JS" do

    describe "GET :show" do
      before do
        get :show, :format => :js, :id => 'en'
      end

      specify { response.content_type.should eq(Mime::JS) }

      it "returns a hash" do
        assigns(:translations).should be_a(Hash)
      end

      it "returns a hash with translations" do
        assigns(:translations)[:name].should eq("YAML Name")
      end
    end

  end

  context "JSON" do

    describe "GET :show" do
      let(:translations) do
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
        translations["en"]["helpers"]["select"]["prompt"].should eq("Please select")
      end
    end

  end

  context "HTML" do

    describe "GET :show" do
      context "without being logged in" do
        before do
          get :show
        end

        it { should respond_with(:forbidden) }
      end

      context "when being logged in as admin" do
        before do
          controller.stub!(:require_admin).and_return(true)
          get :show
        end

        it { should respond_with(:success) }

        it "displays Globalize request host" do
          page.should have_selector('p.request_host')
        end
      end
    end

    describe "PUT :update" do
      let(:intro) { "Introduction" }
      let(:translations) { { :en => { :intro => { :title => intro } } } }

      before { fetch_translations(translations) }

      it "updates the translations" do
        I18n.t(:title, :scope => :intro).should eq(intro)
      end

      it "sets a flash notice" do
        flash[:notice].should_not be_empty
      end

      it "displays a flash notice" do
        page.should have_selector('p.notice')
      end
    end

    describe "PUT :update with error from Globalize" do
      let(:message) { "Not found" }
      let(:translations) { { "errors" => message } }

      before { fetch_translations(translations) }

      it "sets a flash alert" do
        flash[:alert].should_not be_empty
      end

      it "displays a flash alert" do
        page.should have_selector('p.alert')
      end
    end

    describe "GET :list" do
      before do
        @title = Factory(:i18n_title)
        controller.stub!(:require_admin).and_return(true)

        # invalidate #available_translations cache before each run
        I18n.backend.instance_variable_set(:@available_translations, nil)
      end

      it "displays all available translations" do
        get :list
        page.should have_selector('li span', :text => @title.value)
        page.should have_selector('li span', :text => 'YAML Nested Title')
      end

      it "displays available translations in the GlobalizeStore backend" do
        get :list, { :type => 'db', :locale => 'en' }
        page.should have_selector('li span', :text => @title.value)
        page.should_not have_selector('li span', :text => 'YAML Nested Title')
      end
    end

  end

  private

  def fetch_translations(translations_stub)
    controller.stub!(:require_admin).and_return(true)
    GlobalizeApp.any_instance.stub(:fetch_translations) { translations_stub }
    put :update
  end

end
