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

  def self.down
    drop_table :globalize_translations
  end
end
