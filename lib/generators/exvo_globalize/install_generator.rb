require 'rails/generators'

module ExvoGlobalize

  # Creates a new migration adding the translations table to the application
  # and copies the exvo_globalize_i18n.js to public/javascripts/ (for Rails 3.0.x)
  #
  # @example
  # $ rails generate exvo_globalize:install
  class InstallGenerator < Rails::Generators::Base
    include Rails::Generators::Migration

    class_option :template_engine
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

    if ::Rails::VERSION::MAJOR == 3 && ::Rails::VERSION::MINOR == 0
      desc "Copy the exvo_globalize_i18n.js to public/javascripts/"
      def copy_javascript_library
        template '../../../../app/assets/javascripts/exvo_globalize_i18n.js', 'public/javascripts/exvo_globalize_i18n.js'
      end
    end
  end

end
