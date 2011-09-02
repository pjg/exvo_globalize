class GlobalizeTranslation < ActiveRecord::Base

  # based on https://github.com/svenfuchs/i18n-active_record/blob/master/lib/i18n/backend/active_record/translation.rb

  def self.lookup(keys)
    column_name = connection.quote_column_name('key')
    keys = Array(keys).map! { |key| key.to_s }
    namespace = "#{keys.last}#{I18n::Backend::Flatten::FLATTEN_SEPARATOR}%"
    scoped(:conditions => ["#{column_name} IN (?) OR #{column_name} LIKE ?", keys, namespace])
  end

  def self.available_locales
    find(:all, :select => 'DISTINCT locale').map { |t| t.locale.to_sym }
  end

end
