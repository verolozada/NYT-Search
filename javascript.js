$(document).ready(function(){
    // baseUrl
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    
    // api key
    var apiKey = "791647711e7d43a19ad8f71ad3895041"
    
    // variable to hold the search string
    var searchTerm = "raptors" ;
    var searchTermElement = "#search-term";
    
    // record count limiter
    var recordLimiter = 5;
    var recordLimiterElement = "record-limiter";
    
    // search limit start year
    var startYear = "";
    var startYearElement = "#start-year";
    
    // search limit end year
    var endYear = "";
    var endYearElement = "#end-year";
    
    
    // $('#bodyImage').append(
    //     `
    //     <button id="search-button" style="width: 75px; height: 30px;">Search</button>
    
    //     `
    // )
    
    function assembleUrl () {
       
     //input verification search
        searchTerm = searchTerm.replace(" ","+")
    
    
    //input verification date
        if (startYear==="" || startYear.length < 8 || startYear > endYear){
            startYear = ""
        }else {
            startYear = `&begin_date=${startYear}`
        }
    
        if (endYear==="" || endYear.length < 8 ){
            endYear = ""
        }else {
            endYear = `&end_date=${endYear}`
        }
    
    //set URL string including eligible dates
        url = 
        `
        ${url}&query=${searchTerm}${startYear}${endYear}&api-key=${apiKey}
        `
    
        
    
    console.log(url)
    
         return url
    }
    
    $("#search-button").on("click", function () {
        searchTerm = $(searchTermElement).val()
        startYear = $(startYearElement).val()
        endYear = $(endYearElement).val()
        console.log(startYear)
        console.log(endYear)
    
    
        $.ajax({
            url: assembleUrl(),
            method: 'GET',
          }).done(function(response) {
            console.log(response.response.docs[0].headline);
            console.log(response.response.docs[0].web_url);
        
          }).fail(function(err) {
            throw err;
          });
    
       
        
    
    });
    })
    
    