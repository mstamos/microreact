Feature: User Login

  As existing user of the Microscope
  I want to login
  So that I can create new post

  @dev
  Scenario: Login and go to submit page
      Given I am logged in
      When  I click "Submit Post" button
      Then I should navigate to "/submit" page
      And I should see the "Submit" button

