require "exvo_globalize/version"
require "exvo_globalize/globalize_store"

# Make it a Rails engine
module ExvoGlobalize
  require 'exvo_globalize/engine' if defined?(Rails) && Rails::VERSION::MAJOR == 3
end
