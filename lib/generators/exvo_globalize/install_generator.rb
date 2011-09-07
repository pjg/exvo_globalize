require 'rails/generators'

module ExvoGlobalize

  # Creates a new migration adding the translations table to the application
  #
  # @example
  # $ rails generate exvo_globalize:install
  class InstallGenerator < Rails::Generators::Base
    include Rails::Generators::Migration

    source_root File.join(File.dirname(__FILE__), 'templates')

    def self.next_migration_number(dirname)
      if ActiveRecord::Base.timestamped_migrations
        Time.now.utc.strftime("%Y%m%d%H%M%S")
      else
        "%.3d" % (current_migration_number(dirname) + 1)
      end
    end

    desc "Add a 'create_globalize_translations' migration"
    def create_migration_file
      migration_template 'migration.rb', 'db/migrate/create_globalize_translations.rb'
    end
  end

end
