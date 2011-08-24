require 'bundler/gem_tasks'

require 'rspec/core'
require 'rspec/core/rake_task'
import 'lib/tasks/jasmine.rake'
RSpec::Core::RakeTask.new(:spec) do |spec|
  spec.pattern = FileList['spec/**/*_spec.rb']
end

task :default => :spec
