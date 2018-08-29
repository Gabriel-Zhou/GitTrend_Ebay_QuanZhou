$(document).ready(
function() {
    var daterange=getParameter("date");
    var language = getParameter("language");
    
    if (daterange==false || daterange==""){
         daterange='2018-08-20';
    }
    var query_url = query_url = 'https://api.github.com/search/repositories?'+'q=forks&sort=forks&order=desc&per_page=10&page=1&'+'q=created:>'+daterange;
    
                  if (language!=false && language!="" && language!="all")
            query_url = 'https://api.github.com/search/repositories?'+'q=forks&sort=forks&order=desc&per_page=10&page=1&'+'q=created:>'+daterange+'&q=language:'+language;
    
    var ajaxTime= new Date().getTime();

    $.ajax({
            type:'GET',
            url: query_url,
            crossDomain:true,
                dataType:'json',
                success: function(data){
                    if(data.total_count!=0)
                    {
                        var totalTime = new Date().getTime()-ajaxTime;
                        if(data.items.length!=0)
                        {
                            var filtered_lang = language;
                            if(language==false || language=="" || language=="all")
                                filtered_lang = "All Languages";
                            $('.Language').html("Language Filtered By: <span style='color:#4ECAF0'>"+filtered_lang+"</span><br>");
                            $('.DateSince').html("Filter Date Since: <span style='color:#4ECAF0'>"+daterange+"</span><br>");
                            $('.performance').html("<span style='color:#4ECAF0'>Top "+data.items.length+"</span>  Git Repos found in <span style='color:#4ECAF0'>"+totalTime+"</span> milliseconds");
                            var content = "";
                            for(var i=0;i<data.items.length;i++)
                            {
                                content+="<div class='item'><div class='well'>";
                                content+="<h3>"+data.items[i].name+"</h3><br>";
                                if(data.items[i].description!=null)
                                    content+="<p>"+data.items[i].description+"</p><br>";
                                content+="<div><img src='images/gitrepoicon.png' alt='gitrepoicon' style='width:12px;height:12px;vertical-align: top'>"+"&nbsp&nbsp";
                                content+="<a href='"+data.items[i].html_url+"' target='_blank'>"+data.items[i].full_name+"</a></div>";
                                content+="<br><div>";
                                if(data.items[i].language!=null)
                                    content+="<img src='images/langicon.png' alt='langicon' style='width:12px;height:12px;vertical-align: top'>&nbsp"+data.items[i].language;
                                else
                                    content+="<img src='images/langicon.png' alt='langicon' style='width:12px;height:12px;vertical-align: top'>&nbsp"+"Unknown";
           
                                content+="&nbsp&nbsp&nbsp <img src='images/forkicon.png' alt='forkcon' style='width:12px;height:12px;vertical-align: top'>&nbsp"+ data.items[i].forks_count;
           
                                content+="&nbsp&nbsp&nbsp <img src='images/staricon.png' alt='starcon' style='width:12px;height:12px;vertical-align: top'>&nbsp"+ data.items[i].stargazers_count;
           
                                content+="</div><br><div>";
                                content+="Built by &nbsp&nbsp&nbsp <a href='"+data.items[i].owner.html_url+"' target='_blank'><img src='"+data.items[i].owner.avatar_url+"' alt='forkcon' style='width:18px;height:18px;vertical-align: middle'></a>";
                                content+="</div><br>";
                                content+=" <div class='form-group' align='left'><button class='btn btn-primary' onclick='trendChart("+i+",\""+data.items[i].forks_url+"\")' style='background-color:#008CBA;'>Repo Trend!</button>&nbsp&nbsp";
                                content+= "<button class='btn btn-primary' onclick='toggleChart("+i+")' style='background-color:black;'> Show/Hide </button></div><br>";
                                content+="<div id='trend"+i+"'></div>";
                                content+="<div id='trendTitle"+i+"'></div>"
                                content+="</div></div>";
                            }
                            $('.objectIndex').html(content);
                        }
                        else
                        {
                            $('.objectIndex').html("No Git Repo is found.");
                        }
                    }
                    else
                    {
                        $('.objectIndex').html("Unexpected error. Please refresh and try again.");
                    }
                },
                error:function(data)
                {
                    alert("Unexpected error. Please refresh and try again.");
                }
    });
});


$(document).ready(
    function(){
        $('#filter').submit(function(e)
        {
            e.preventDefault();
            
            var daterange= document.getElementById("daterange");
            var daterange_val="";
            if(daterange!="")
                    daterange_val=daterange.value;
            
            var lang= document.getElementById("language");
            var lang_val="";
            if(lang!="")
               lang_val=lang.value;
                   
            var filter_cond = "?date="+daterange_val+"&language="+lang_val;
                            
            console.log(filter_cond);
            
            var location_token=window.location.href.split("?");
            window.location.href = location_token[0]+ filter_cond;
        })
    }
);

function getParameter(theParameter) {
    var params = window.location.search.substr(1).split('&');
    
    for (var i = 0; i < params.length; i++) {
        var p=params[i].split('=');
        if (p[0] == theParameter) {
            return decodeURIComponent(p[1]);
        }
    }
    return false;
}

function trendChart(i,forksURL)
{
    $.ajax({
           type:'GET',
           headers: {
              Accept: "application/vnd.github.v3+json"
           },
           url: forksURL+"?sort=newest&per_page=100",
           crossDomain:true,
           dataType:'json',
           success: function(data){
                if(data.length!=0)
                {
                    var xarray = new Array();
                    var yarray = new Array();
           
                    for(var j=0;j<data.length;j++)
                    {
                        var forkDate = data[j].created_at;
                        var datetokens = forkDate.split('T');
                        xarray.push(datetokens[0]+" "+datetokens[1]);
                        yarray.push(j);
                    }
           
                    xarray.reverse();
           
                    var data = [
                       {
                                x: xarray,
                                y: yarray,
                                type: 'scatter'
                       }
                       ];
           
                    Plotly.newPlot('trend'+i, data);
           
                    var chartTitle = document.getElementById('trendTitle'+i);
                    chartTitle.innerHTML = "<h4 align='middle'> Trend shows when repo's <span style='color:#4ECAF0'>newest forks happen!</span></h4>";
                }
                else
                {
                    $('#trend'+i).html("No Forks History is Found.");
                }
           },
           error:function(data)
           {
                alert("Unexpected error. Please refresh and try again.");
           }
    });
}

function toggleChart(i)
{
    var trendObject = document.getElementById("trend"+i);
    if (trendObject.style.display === "none") {
        trendObject.style.display = "block";
    } else {
        trendObject.style.display = "none";
    }
    
    var trendTitle = document.getElementById("trendTitle"+i);
    if (trendTitle.style.display === "none") {
        trendTitle.style.display = "block";
    } else {
        trendTitle.style.display = "none";
    }

}
