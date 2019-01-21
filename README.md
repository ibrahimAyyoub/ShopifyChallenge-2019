# Toronto Waste Lookup -Shopify Challenge 2019


# Description

Build a web app to search for waste items using the Toronto Waste Wizard database, and save frequently used ones.

# Instructions
- Reproduce the design as provided in the screenshot, which displays example search results.
- The data must be taken from the [Waste Wizard Lookup data (JSON)](https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#5ed40494-a290-7807-d5da-09ab6a56fca2).
- Typing in the search field should *NOT* perform an API call.
- A search must be performed when hitting enter or clicking the search button.
- When the search input field is cleared, the list of results should also be cleared. 
- Performing a search should render a list of potential matching items based on keywords. Each item should:
   - Render the title and description of the item.
   - Render a grey star button *if the item is not already favourited*.
   - Render a green star icon *if the item is not already favourited*.
   - Clicking the star button should add the item to the favourites list.
- When the number of favourites is more than one, the app should render a list of items. Each saved item should:
   - Render the title and description of the item.
   - Render a green star button *if the item has been favourited*.
   - Clicking the green star button should remove the item from the saved list.
   
# Programming Languages/Frameworks/API's used:
   - Javascript(ES6)
   - Html5
   - Css3
   - Bootstrap
   - Fetch API(built in API)
# Testing/Deployment


- A link to a hosted version : https://ibrahimayyoub.com/WebEngineer/index.html
- Note! If for anyreason the hosted version isn't working, clone the repository and launch the index.html, it should be working just as fine.
