Capybara.default_driver = :selenium
# use_transactional_fixtures = false
Given(/^I already registered$/) do
  unless User.find_by_email('admin@gmail.com')
    create(:user)
  end
end

Given(/^I haven't signed in$/) do
  visit '/users/sign_out'
end

When(/^I go to the homepage$/) do
  visit '/'
end

Then(/^I should be ask for signing in$/) do
  expect(page).to have_current_path('/users/sign_in')
end

Given(/^I signed in$/) do
  visit '/users/sign_out'
  fill_in 'Email', with: 'admin@gmail.com'
  fill_in 'Password', with: '123123'
  click_button 'Log in'
end

When(/^I click 'POS' button$/) do
  click_on 'POS'
  byebug
end

Then(/^I should see the POS page$/) do
  expect(page).to have_content('POS')
end

Then(/^I should see the 'All Tables' list$/) do
  expect(page).to have_selector(:link_or_button, 'B1')
end

Given(/^I'm at the POS page$/) do
  visit '/pos'
end

When(/^I click a table$/) do
  click_on 'B1'
end

Then(/^I should see that table name$/) do
  expect(page).to have_content('Table: B1')
end

Then(/^I should see the Menu Category list$/) do
  expect(page).to have_selector(:link_or_button, 'Signature')
end

When(/^I click a Menu Category$/) do
  click_on 'Signature'
end

Then(/^I should see a list of that category$/) do
  expect(page).to have_selector(:link_or_button, 'Hanky')
end

When(/^I click a Menu Item$/) do
  click_on 'Hanky'
end

Then(/^I should see new order$/) do
  expect(page).to have_content('Hanky')
  expect(page).to have_content('new')
end

When(/^I click 'Submit' button$/) do
  click_on 'Submit'
end

Then(/^I should see 'submitted'$/) do
  expect(page).to have_content('submitted')
end