namespace :"globalize:translations:dump" do
  desc "Dump GlobalizeStore I18n translations as YAML"
  task :yaml => :environment do
    puts "Dumping translations as YAML..."
    puts I18n.backend.globalize_store.available_translations.ya2yaml
  end

  desc "Dump GlobalizeStore I18n translations as Ruby Hash"
  task :ruby => :environment do
    puts "Dumping translations as Ruby Hash..."
    ap I18n.backend.globalize_store.available_translations, { :plain => true, :indent => 2, :sorted_hash_keys => true }
  end
end
