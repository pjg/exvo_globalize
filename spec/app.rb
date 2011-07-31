require 'active_record'
require 'action_controller/railtie'
require 'action_view/railtie'

# database
ActiveRecord::Base.configurations = { 'test' => { :adapter => 'sqlite3', :database => ':memory:' } }
ActiveRecord::Base.establish_connection 'test'

# config
app = Class.new(Rails::Application)
app.config.secret_token = "aoijg543oi2u88923j4fnvfjt529hg92"
app.config.session_store :cookie_store, :key => "_exvo_globalize_session"
app.config.active_support.deprecation = :log
app.config.i18n.default_locale = :en
app.initialize!

# application controller
class ApplicationController < ActionController::Base
end

# migration
class CreateGlobalizeTranslations < ActiveRecord::Migration
  def self.up
    create_table :globalize_translations do |t|
      t.string :locale
      t.string :key
      t.text :value
      t.text :interpolations
      t.boolean :is_proc, :default => false
      t.timestamps
    end
  end
end
