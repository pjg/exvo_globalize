require 'spec_helper'

describe ExvoGlobalize do

  let(:i18n_example) { Factory(:i18n_example) }

  it "caches translations in memory" do
    old = I18n.translate(:example)
    new = 'New example'

    i18n_example.update_attributes(:value => new)
    i18n_example.reload
    i18n_example.value.should eq(new)

    I18n.translate(:example).should eq(old)
  end

end
