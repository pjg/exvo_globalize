require 'spec_helper'

describe ExvoGlobalize do

  it "caches translations in memory" do
    i18n_header = Factory(:i18n_header)

    old = I18n.translate(:header)
    new = 'New header'

    i18n_header.update_attributes(:value => new)
    i18n_header.reload
    i18n_header.value.should eq(new)

    I18n.translate(:header).should eq(old)
  end

end
