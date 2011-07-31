$:.unshift(File.join(File.dirname(__FILE__), '..', 'lib'))
$:.unshift(File.dirname(__FILE__))

require 'rails'
require 'exvo_globalize'

require File.join(File.dirname(__FILE__), 'app')

require 'rspec/rails'
require 'factory_girl_rails'

# Requires supporting ruby files with custom matchers and macros, etc.
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  config.mock_with :rspec

  # run migrations
  config.before :all do
    CreateGlobalizeTranslations.up unless ActiveRecord::Base.connection.table_exists? 'globalize_translations'
  end

  # run each spec within a transactions
  config.use_transactional_fixtures = true
end
