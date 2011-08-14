namespace :"globalize:translations:dump" do
  desc "Dump GlobalizeStore I18n translations as YAML"
  task :yaml => :environment do
    puts "Dumping translations as YAML..."
    backend = I18n.backend.globalize_store
    translations = backend.available_translations
    puts backend.nest_translations(translations).ya2yaml
  end

  desc "Dump GlobalizeStore I18n translations as Ruby Hash"
  task :ruby => :environment do
    puts "Dumping translations as Ruby Hash..."
    backend = I18n.backend.globalize_store
    translations = backend.available_translations
    ap backend.nest_translations(translations), { :plain => true, :indent => 2, :sorted_hash_keys => true }
  end
end
