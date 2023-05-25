//Recipe-search

function save_link_name(element){
    localStorage.setItem('link_name_recipe', element);
    var string = localStorage.getItem('link_name_recipe')
    console.log(string);
  }