let newsList = [];
let apiKey = `139b94f02a174a238f83c71018505bab`;
const menus = document.querySelectorAll(".menus button");
const newsUrl = `https://newsapi.org/v2/everything?country=kr&apiKey=${apiKey}`     // newsapi
const url1 = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const url2 = `https://super-quokka-748388.netlify.app/top-headlines?country=kr`;    //netlify domai

// 메뉴 클릭
menus.forEach(menu=>menu.addEventListener("click", (e)=>fetchNews({ category: e.target.textContent.toLowerCase() })))

// 검색
document.getElementById("search-button").addEventListener("click", () => {
    const keyword = document.getElementById("search-input").value;
    fetchNews({ keyword });
});

// getLatestNews, getNewsByCategory, getNewsByKeyword func Assemble!!
async function fetchNews({category='',keyword=''} = {}){
    let baseurl = url2;
    if(category) baseurl += `&category=${category}`;
    if(keyword) baseurl += `&q=${keyword}`;

    const response = await fetch(baseurl);
    const data = await response.json();
    
    newsList = data.articles;
    render();
}

const render = ()=>{ 
    // array function
    const newsHTML = newsList.map(news=>`<div class="row news">
                                            <div class="col-lg-4">
                                                <img class="news-img-size" src=${
                                                                                    news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                                                                                }>
                                            </div>
                                            <div class="col-lg-8">
                                                <h3>${news.title}</h3>
                                                <p>
                                                    ${
                                                        news.description == null || news.description  == ""
                                                        ? "내용없음"
                                                        : news.description.length > 200
                                                        ? news.description.substring(0,200) + "..."
                                                        : news.description
                                                    }
                                                </p>
                                                <div>
                                                    ${news.source.name || "No source"} * ${moment(news.publishedAt).fromNow()}
                                                </div>
                                            </div>
                                        </div>`
                                ).join('');

    
    document.getElementById('news-board').innerHTML = newsHTML;
}

fetchNews();