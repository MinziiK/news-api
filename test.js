// console.log(1);

// setTimeout(()=>console.log(2), 5000);   // 딜레이함수 (5초 뒤 실행)

// console.log(3);

const getLatestNews = ()=>{
    const url = new URL(
        `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
        ); 
    console.log("uuu", url);

    const response = fetch(url);    // url 호출 함수 : fetch

    console.log("rrr", response);
}

getLatestNews();
for(let i=0;i<20;i++){
    console.log("after", i);
}