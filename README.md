# jQuery ElementBag #

The elementBag is a simple solution to cache the result of element queries. Normally you store the query result in a
variable, but the elementBag offers an alternative solution.

This is how you do it with the elementBag

    $(document).ready(function(){
      var bag = $.elementBag;

      // Get the element from the document. This first version of elementBag only uses ids
      bag("main-column");

      // Now the element is "put" in the bag. You can get the element this easy
      $("p", bag.main_column);

      // Or maybe you want to get the element wrapped in the jQuery object.
      bag.$main_column.css("font-size", "1.5em");

    });

Not to hard to learn, right?

If you want to retrieve the cached elements in another function scope, you can do this, since
the elementBag is attached to the jQuery object. I've used the elementBag in a quite big project
with a lot of scopes. The bag remember if an element already has been retrieved (via memoization), so
you don't have to be affraid to 