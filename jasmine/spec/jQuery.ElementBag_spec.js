describe("Testing the jQuery.ElementBag", function(){

  var bag = $.elementBag;

  it("Add and retrive", function(){

    var context = $("<div><div id='i-am-an-element'>Retrieve me</div></div>").get(),
        result;

    bag("i-am-an-element", context);

    result = $(bag.i_am_an_element).text();

    expect(result).toEqual("Retrieve me");

  });

  it("Add and retrive with prefix", function(){

    var context = $("<div><div id='i-am-an-element'>Retrieve me</div></div>").get(),
        result;

    bag("i-am-an-element", context);

    result = bag.$i_am_an_element.text();

    expect(result).toEqual("Retrieve me");

  });

  it("Get a fresh element", function(){

    var context = $("<div><div id='dynamic'>Original</div></div>").get();

    bag("dynamic", context);

    bag("dynamic");

    var elem1 = bag.dynamic;

    $(context).detach("#dynamic").append("<div id='dynamic'>Follower</div>");

    bag.clear("dynamic");
    bag("dynamic");

    var elem2 = bag.dynamic;

    expect(elem1).not.toEqual(elem2);

  });

  it("simple performance test", function(){

    // Maybe not the most sophisticated performance test...

    var resultDl;

    $(document.body).append("<dl id='performance-test-result'></dl>");
    resultDl = $("#performance-test-result");

    (function(){
      var collected = "",
          started, ended;
      started = new Date().getTime();

      for(var i = 0; i < 10000; i++){
        collected = $("#pick-me").text();
      }

      ended = new Date().getTime();
      window.console.log(ended-started);
    }());

    (function(){
      var collected = "",
          started, ended, $p;
      started = new Date().getTime();

      $p = $("#pick-me");

      for(var i = 0; i < 10000; i++){
        collected = $p.text();
      }

      ended = new Date().getTime();
      window.console.log(ended-started);
    }());

    (function(){
      var bag       = $.elementBag,
          collected = "",
          started, ended;
      started = new Date().getTime();

      bag("pick-me");

      for(var i = 0; i < 10000; i++){
        collected = bag.$pick_me.text();
      }

      ended = new Date().getTime();
      window.console.log(ended-started);
    }());    

  });

});