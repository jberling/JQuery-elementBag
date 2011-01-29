(function($){

  $.elementBag = function(id, contextElement) {

    var memoized = $.elementBag,
        key      = id.replace(/-/g, "_"),
        $key     = "$" + key,
        found;

    if (!memoized[key]) {
      found = $("#"+id, contextElement);
      memoized[$key] = found;
      memoized[key] = found.get(0);
    }

    memoized.clear = function(id){
      memoized[id] = undefined;
    }

    return memoized[$key];

  };

}(jQuery));