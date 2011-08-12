# encoding: utf-8

require 'spec_helper'

describe ExvoGlobalize do

  context "Polish pluralization rules" do

    before { I18n.locale = :pl }

    specify { I18n.t(:mail, :count => 0).should  match(/listów$/) }
    specify { I18n.t(:mail, :count => 1).should  match(/list$/)   }
    specify { I18n.t(:mail, :count => 3).should  match(/listy$/)  }
    specify { I18n.t(:mail, :count => 5).should  match(/listów$/) }
    specify { I18n.t(:mail, :count => 12).should match(/listów$/) }
    specify { I18n.t(:mail, :count => 22).should match(/listy$/)  }

    after { I18n.locale = I18n.default_locale }

  end

end
