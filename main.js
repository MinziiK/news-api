let newsList = [];
let apiKey = `139b94f02a174a238f83c71018505bab`;
const newsUrl = `https://newsapi.org/v2/everything?country=kr&apiKey=${apiKey}`     // newsapi
const url1 = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const url2 = `https://super-quokka-748388.netlify.app/top-headlines?country=kr`;    //netlify domain



const getLatestNews = async ()=>{
    const requestUrl = new URL(url2); 
    const response = await fetch(requestUrl);
    const data = await response.json();
    newsList = data.articles;
    render();

    // console.log("uuu", requestUrl);
    // console.log("rrr", response);
    // console.log("data", data)
    console.log("articles", newsList);
}

const render = ()=>{    
    // array function
    const newsHTML = newsList.map(news=>`<div class="row news">
                                            <div class="col-lg-4">
                                                <img class="news-img-size" src=${news.urlToImage}>
                                            </div>
                                            <div class="col-lg-8">
                                                <h3>${news.title}</h3>
                                                <p>
                                                    ${news.description}
                                                </p>
                                                <div>${news.source.name} * ${news.publishedAt}</div>
                                            </div>
                                        </div>`
                                ).join('');

    console.log(newsHTML);
    document.getElementById('news-board').innerHTML = newsHTML;
}

getLatestNews();
