let news = [];

const getLatestNews = async ()=>{
    const url = new URL(
        `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
        ); 
    console.log("uuu", url);

    const response = await fetch(url);    // url 호출 함수 : fetch
    const data = await response.json();
    news = data.articles;

    console.log("rrr", response);
    console.log("data", data)
    console.log("articles", news);
}

getLatestNews();
