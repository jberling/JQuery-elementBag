describe("Testing StyleFiddler functionality", function () {

  it("rules to stylesheet string", function () {
    var result = sf.rulesToString([
      { selector: ["a", "span"],
        declarations: [{ property: "color", value: "lime" },
                        { property: "background", value: "green" }
                      ]
      },
      { selector: ["h1"],
        declarations: [{ property: "font-weight", value: "bold"}]
      }
    ]);
    expect(result).toEqual("a,span{color:lime;background:green;}h1{font-weight:bold;}");
  });

  it("html to doc", function () {
    var stylesheet =
      $('<dl id="stylesheet">' +
          '<dt class="selectors">' +
              '<ul><li class="selector" contenteditable="">body</li></ul>' +
          '</dt>' +
          '<dd class="declarations">' +
              '<dl>' +
                  '<dt contenteditable="" class="property">color</dt>' +
                  '<dd contenteditable="" class="value">White</dd>' +
                  '<dt contenteditable="" class="property">background</dt>' +
                  '<dd contenteditable="" class="value">Black</dd>' +
              '</dl>' +
          '</dd>' +
          '<dt class="selectors">' +
              '<ul>' +
                  '<li class="selector" contenteditable="">a</li>' +
                  '<li class="selector" contenteditable="">span</li>' +
              '</ul>' +
          '</dt>' +
          '<dd class="declarations">' +
              '<dl>' +
                  '<dt contenteditable="" class="property">color</dt>' +
                  '<dd contenteditable="" class="value">Aqua</dd>' +
              '</dl>' +
          '</dd>' +
        '</dl>');
    $(stylesheet).data("id", "test-id");
    $(stylesheet).data("rev", "test-rev");

    var result = $(stylesheet).extractDoc();

    expect(result).toEqual({
      _id: "test-id",
      _rev: "test-rev",
      rules: [
        { selector: ["body"],
          declarations: [{ property: "color", value: "White" },
                            { property: "background", value: "Black"}]
        },
        { selector: ["a", "span"],
          declarations: [{ property: "color", value: "Aqua"}]
        }
      ]
    });
    
  });
});