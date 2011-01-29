# Cache is king #

Suddenly you realize the jQuery selectors are handy but not magical. The queried result is not cached, and
every time you write i.e. $("#my-element"), you will search for an element with the
id "my-element" on the current page. This is can be expensive, and therefore you want to save the queried results.

The normal way of saving (or caching) the queried result is using a variable. I have nothing against it, but
the elementBag offers another solution with a couple of benefits. Think of the elementBag as a ... hrm ... bag,
in which you put the queried elements.

Why should I use it? Well, it can be reached from several function scopes, and because it remembers
(via memoization) if it has stored an element before, you don't have to keep track of different variables
in different scopes. Further on it offers a nice way to handle elements wrapped in a jQuery object or plain
unwrapped elements.

Let's take a look at the elementBag in action:

    $(document).ready(function(){
      // 1. Since you will call the elementBag function a lot, tie it to a short variable name.
      var bag = $.elementBag;

      // 2. Get the element from the document. The elementBag is a very simple construction and only
      // uses ids for the moment.
      bag("main-column");

      // Now the element is "put" in the bag. You can get the plain DOM element this easy.
      // You just use the element id as a property name of the bag. Note that dashes will be
      // converted to underscore.
      $("p", bag.main_column);

      // If you want the element wrapped in the jQuery object, you just prefix the key with '$'.
      bag.$main_column.css("font-size", "1.5em");

    });

I've used the elementBag in a quite big project, and it has worked really well. I always structure the code in a
similar manner. (1) To begin with I tie bind $.elemenBag function to a variable with a short name (usually 'bag' or 'el').
(2) Then I invoke the function with the different ids of the element used in the function. If it's the first time the
elementBag function has been invoked with a specific id, then the element will be searched for, otherwise it is already
in the bag.

Please, give it a try and let me know what you think!