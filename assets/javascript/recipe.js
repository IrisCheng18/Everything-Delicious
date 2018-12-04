function getRecipe(searchText = "") {
  return new Promise(function (resolve) {
    // frank's edamam api key
    var apiKey = "53d3f933242cd18123fd5222bea8319d";
    var apiId = "9dde05df";

    // edamam url base
    var queryURL =
      "http://api.edamam.com/search?from=0&to=20&app_id=" +
      apiId +
      "&app_key=" +
      apiKey + "&q=" + searchText;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var recipes = [];
      for (var i = 0; i < response.hits.length; i++) {
        var recipeObj = {imageURL: response.hits[i].recipe.image, title: response.hits[i].recipe.label};
        recipes.push(recipeObj);
      };

      resolve(recipes);
    });
  });
};
