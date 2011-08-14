require 'spec_helper'

describe ExvoGlobalize do

  let(:backend) { I18n.backend.globalize_store }

  it "should not change a normal hash" do
    hash = { 'hello' => "Hello", 'world' => "World" }
    backend.nest_translations(hash).should eq(hash)
  end

  it "should not change a nested hash" do
    nested_hash = { 'en' => { 'hello' => "Hello World!", 'world' => "World!" } }
    backend.nest_translations(nested_hash).should eq(nested_hash)
  end

  it "should nest a simple flatten hash" do
    hash = { "hello.world" => "Hello World!" }
    nested_hash = { 'hello' => { 'world' => "Hello World!" } }
    backend.nest_translations(hash).should eq(nested_hash)
  end

  it "should nest a complicated flatten hash with symbol key" do
    hash = {
      :en => {
        "hello.world" => "Hello World!",
        "hello.earth" => "Hello Earth!"
      }
    }

    nested_hash = {
      'en' => {
        'hello' => {
          'world' => "Hello World!",
          'earth' => "Hello Earth!"
        }
      }
    }

    backend.nest_translations(hash).should eq(nested_hash)
  end

end
