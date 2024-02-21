let news = [];
const url1 = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const url2 = `https://super-quokka-748388.netlify.app/top-headlines?country=kr`;


const getLatestNews = async ()=>{
    const requestUrl = new URL(url2); 
    console.log("uuu", requestUrl);

    const response = await fetch(requestUrl);
    const data = await response.json();
    news = data.articles;

    console.log("rrr", response);
    console.log("data", data)
    console.log("articles", news);
}

getLatestNews();
