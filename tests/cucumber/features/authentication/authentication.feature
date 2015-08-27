Feature: User Login

  As existing user of the Microscope
  I want to login
  So that I can create new post

  Background: Login and already at submit page
    Given I am logged in
    When  I click "Submit Post" button
    Then I should navigate to "/submit" page


  Scenario: Should see the submit page 
    And I should see the "Submit" button
    


