Feature: Create New Post

  As existing user of the Microscope
  I want to login
  So that I can submit new post

  Background: Logged in and already at submit page
    Given I am logged in
    And   I navigate to submit new post page

  Scenario: Submit a new post
    When  I fill in all form's fields
    And   I submit the form
    Then  I should see the new post

  Scenario: Existing Post
    When I fill form's fields with existing post
    And  I submit the form
    Then  I should see an error message


