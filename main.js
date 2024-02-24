let newsList = [];
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
let apiKey = `139b94f02a174a238f83c71018505bab`;
const menus = document.querySelectorAll(".menus button");
const newsUrl = `https://newsapi.org/v2/everything?country=kr&apiKey=${apiKey}`     // news-api
const url1 = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const url2 = `https://super-quokka-748388.netlify.app/top-headlines?country=kr`;    //netlify domain

// 메뉴 클릭
menus.forEach(menu=>menu.addEventListener("click", (e)=>fetchNews({ category: e.target.textContent.toLowerCase() })))

// 검색
document.getElementById("search-button").addEventListener("click", 
                                                                    ()=>{
                                                                        const keyword = document.getElementById("search-input").value;
                                                                        fetchNews({ keyword });
                                                                    }
                                                            );

// getLatestNews, getNewsByCategory, getNewsByKeyword func Assemble!!
async function fetchNews({category='',keyword=''} = {}){
    let baseurl = url2;
    if(category) baseurl += `&category=${category}`;
    if(keyword) baseurl += `&q=${keyword}`;

    try{
        baseurl.searchParams.set("page", page); // &page=page
        baseurl.searchParams.set("pageSize", pageSize); // &pageSize=pageSize
        const response = await fetch(baseurl);
        const data = await response.json();
        if(response.status === 200){
            if(data.articles.length===0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        }
        else{
            throw new Error(data.message);
        }
        
    }
    catch(error){
        errorRender(error.message);
    }
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

const errorRender = (errorMessage)=>{
    const errorHTML = `<div class="alert alert-danger" role="alert">
                        ${errorMessage}
                    </div>`
    document.getElementById("news-board").innerHTML = errorHTML;
}

const paginationRender = ()=>{
    const pageGroup = Math.ceil(page/groupSize);
    const lastPage = pageGroup * groupSize;
    const firstPage = lastPage - (groupSize-1);

    // first~last : bootstrap!!!
    let paginationHTML = ``
    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML += `<li class="page-item" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    document.querySelector(".pagination").innerHTML = paginationHTML
}

const moveToPage = (pageNum)=>{
    console.log("moveToPage", pageNum);
    page = pageNum;
    fetchNews();
}

fetchNews();