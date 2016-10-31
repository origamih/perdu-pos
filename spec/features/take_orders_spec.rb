require 'rails_helper'

# Helper to locate an order by its name
def find_order(name)
  page.find(:xpath, "//a/span/p[contains(text(), '#{name}')]")
end

def find_order_node(name)
  find_order(name).find(:xpath, '../../../..')
end

feature "User takes orders by table and", js: true do
  background "User already registered and signed in. It has one table, one menu_category and one menu_item" do
    create(:user)
    visit '/users/sign_out'
    fill_in 'Email', with: 'admin@gmail.com'
    fill_in 'Password', with: '123123'
    click_button 'Log in'
    create(:table)
    create :menu_item
  end

  scenario "User goes to POS page" do
    visit '/pos'
    expect(page).to have_content('All Tables')
    expect(page).to have_content('B1')
  end

  given(:go_to_B1_table) {
    visit '/pos'
    click_on 'B1'
  }

  scenario "User takes orders" do
    go_to_B1_table
    expect(page).to have_button('Signature')
    click_button 'Signature'
    expect(page).to have_button('Hanky')
    click_button 'Hanky'
    expect(page).to have_content('new')
    click_on 'Submit'
    expect(page).to have_content('submitted')
  end

  given(:order_hanky) {
    go_to_B1_table
    click_button 'Signature'
    click_button 'Hanky'
  }

  scenario 'gifts new order' do
    order_hanky
    find_order('Hanky').click
    click_on 'Gift'
    expect(find_order_node 'Hanky').not_to have_content('gift')
    expect(find_order_node 'Hanky').to have_content('new')
  end

  scenario 'gifts submitted order' do
    order_hanky
    click_button 'Submit'
    find_order('Hanky').click
    click_on 'Gift'
    expect(find_order_node 'Hanky').to have_content('submitted, gift')
    find_order('Hanky').click
    click_button 'Cancel Gift'
    expect(find_order_node 'Hanky').to have_content('submitted')
    expect(find_order_node 'Hanky').not_to have_content('gift')
  end

  scenario 'voids new order' do
    order_hanky
    find_order('Hanky').click
    click_button 'Void'
    expect(find_order_node 'Hanky').not_to have_content('submitted, void')
    expect(find_order_node 'Hanky').to have_content('new')
  end

  scenario 'voids submitted order' do
    order_hanky
    click_button 'Submit'
    find_order('Hanky').click
    click_button 'Void'
    expect(find_order_node 'Hanky').to have_content('submitted, void')
    click_button 'Cancel Void'
    expect(find_order_node 'Hanky').not_to have_content('void')
    expect(find_order_node 'Hanky').to have_content('new')
  end

  scenario 'cancels new orser' do
    order_hanky
    expect(page).to have_selector('td', count: 1)
    find_order('Hanky').click
    click_button 'Cancel'
    expect(page.find(:xpath, '//table').all('td').size).to eq(0)
  end

  scenario 'cancels submitted orser' do
    order_hanky
    click_button 'Submit'
    expect(page).to have_selector('td', count: 1)
    find_order('Hanky').click
    click_button 'Cancel'
    expect(find_order_node 'Hanky').not_to have_css('td[style]')
  end

end